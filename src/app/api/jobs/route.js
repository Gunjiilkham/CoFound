import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function GET() {
    // Debug logging
    console.log('API Route - Environment Variables:', {
        hasApiKey: !!process.env.FINDWORK_API_KEY,
        nodeEnv: process.env.NODE_ENV
    });

    if (!process.env.FINDWORK_API_KEY) {
        console.error('FINDWORK_API_KEY is missing');
        return NextResponse.json(
            { error: 'API key configuration error' },
            { status: 500 }
        );
    }

    try {
        const response = await fetch('https://findwork.dev/api/jobs/', {
            headers: {
                'Authorization': `Token ${process.env.FINDWORK_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        // Log the response status
        console.log('FindWork API Response:', {
            status: response.status,
            ok: response.ok
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('FindWork API Error:', errorText);
            return NextResponse.json(
                { error: `FindWork API Error: ${response.status}` },
                { status: response.status }
            );
        }

        const jobsData = await response.json();
        
        // Filter internships using OpenAI
        const filteredJobs = await filterInternships(jobsData.results);
        return NextResponse.json({ results: filteredJobs });
    } catch (error) {
        console.error('Job fetch error:', error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}

async function filterInternships(jobs) {
    const chunks = [];
    for (let i = 0; i < jobs.length; i += 10) {
        chunks.push(jobs.slice(i, i + 10));
    }

    const filteredChunks = await Promise.all(
        chunks.map(async (chunk) => {
            const completion = await openai.chat.completions.create({
                messages: [{
                    role: "system",
                    content: "You are a job filtering assistant. Analyze the job listings and return only those that are internships or entry-level positions suitable for students. Return the response as a JSON array of indices of matching positions."
                }, {
                    role: "user",
                    content: JSON.stringify(chunk.map(job => ({
                        title: job.title,
                        description: job.description
                    })))
                }],
                model: "gpt-3.5-turbo",
            });

            const matchingIndices = JSON.parse(completion.choices[0].message.content);
            return matchingIndices.map(index => chunk[index]);
        })
    );

    return filteredChunks.flat();
}