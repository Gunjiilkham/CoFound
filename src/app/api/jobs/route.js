import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    // organization: "org-xxx",  // Optional - only if you belong to multiple organizations
});

async function filterInternships(jobs) {
    const chunks = [];
    for (let i = 0; i < jobs.length; i += 10) {
        chunks.push(jobs.slice(i, i + 10));
    }

    const filteredChunks = await Promise.all(
        chunks.map(async (chunk) => {
            const completion = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [{
                    role: "system",
                    content: "You are a job filtering assistant. Analyze the job listings and return only those that are internships or entry-level positions suitable for students. Return ONLY a JSON array of indices of matching positions, with no markdown formatting or explanation. For example: [0,2,5]"
                }, {
                    role: "user",
                    content: JSON.stringify(chunk.map(job => ({
                        title: job.title,
                        description: job.description
                    })))
                }],
            });

            try {
                const content = completion.choices[0].message.content.trim();
                // Remove any markdown formatting if present
                const jsonStr = content.replace(/```json\n?|\n?```/g, '').trim();
                const matchingIndices = JSON.parse(jsonStr);
                
                if (!Array.isArray(matchingIndices)) {
                    console.error('Invalid response format:', content);
                    return [];
                }
                
                return matchingIndices.map(index => chunk[index]);
            } catch (error) {
                console.error('Error parsing OpenAI response:', error);
                console.error('Raw response:', completion.choices[0].message.content);
                return [];
            }
        })
    );

    return filteredChunks.flat();
}

export async function GET() {
    if (!process.env.ADZUNA_APP_ID || !process.env.ADZUNA_APP_KEY) {
        console.error('Adzuna API credentials missing');
        return NextResponse.json(
            { error: 'API key configuration error' },
            { status: 500 }
        );
    }

    try {
        const response = await fetch(
            `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${process.env.ADZUNA_APP_ID}&app_key=${process.env.ADZUNA_APP_KEY}&results_per_page=20&what=internship`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch jobs from Adzuna');
        }

        const data = await response.json();
        
        // Format the response before sending
        const formattedJobs = data.results.map(job => ({
            id: job.id,
            title: job.title,
            company: {
                name: job.company.display_name
            },
            location: {
                city: job.location.display_name,
                area: job.location.area
            },
            description: job.description,
            salary: {
                min: job.salary_min,
                max: job.salary_max
            },
            url: job.redirect_url,
            posted: job.created
        }));

        return NextResponse.json({
            success: true,
            count: formattedJobs.length,
            results: formattedJobs
        });

    } catch (error) {
        console.error('Error fetching jobs:', error);
        return NextResponse.json(
            { 
                success: false, 
                error: error.message 
            },
            { status: 500 }
        );
    }
}