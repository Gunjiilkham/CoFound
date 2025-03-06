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
                    content: "You are a job filtering assistant. Analyze the job listings and return only those that are internships or entry-level positions suitable for students. For each position, provide a well-structured description including key details like responsibilities, requirements, and benefits. Return ONLY a JSON array of indices of matching positions, with no markdown formatting or explanation. For example: [0,2,5]"
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

// Add fallback job data
const fallbackJobs = [
    {
        id: "fallback1",
        title: "Software Engineering Intern",
        company: {
            name: "Tech Solutions Inc."
        },
        location: {
            city: "San Francisco",
            area: ["San Francisco", "California", "United States"]
        },
        description: "We are looking for a passionate Software Engineering Intern to join our team. You will work on real-world projects, collaborate with experienced developers, and gain valuable industry experience. Requirements: Currently pursuing a degree in Computer Science or related field. Knowledge of at least one programming language. Responsibilities: Assist in developing and testing software applications. Participate in code reviews and team meetings. Benefits: Competitive stipend. Flexible work hours. Mentorship from senior engineers.",
        salary: {
            min: 60000,
            max: 60000,
            hourlyMin: 29,
            hourlyMax: 29
        },
        url: "https://example.com/job1",
        posted: "2023-05-15T12:00:00Z"
    },
    {
        id: "fallback2",
        title: "Marketing Intern",
        company: {
            name: "Brand Builders"
        },
        location: {
            city: "New York",
            area: ["New York", "New York", "United States"]
        },
        description: "Join our marketing team as an intern and help develop creative campaigns for our clients. Requirements: Currently pursuing a degree in Marketing, Communications, or related field. Strong written and verbal communication skills. Responsibilities: Assist in creating social media content. Help analyze marketing data and prepare reports. Benefits: Networking opportunities. Real-world marketing experience. Potential for full-time employment after graduation.",
        salary: {
            min: 52000,
            max: 52000,
            hourlyMin: 25,
            hourlyMax: 25
        },
        url: "https://example.com/job2",
        posted: "2023-05-16T12:00:00Z"
    },
    {
        id: "fallback3",
        title: "Finance Intern",
        company: {
            name: "Global Financial"
        },
        location: {
            city: "Chicago",
            area: ["Chicago", "Illinois", "United States"]
        },
        description: "Seeking a Finance Intern to assist our team with financial analysis and reporting. Requirements: Currently pursuing a degree in Finance, Accounting, or related field. Proficiency in Excel. Responsibilities: Help prepare financial reports. Assist with data analysis and research. Benefits: Exposure to financial industry practices. Mentorship from financial professionals. Opportunity to build professional network.",
        salary: {
            min: 55000,
            max: 55000,
            hourlyMin: 26,
            hourlyMax: 26
        },
        url: "https://example.com/job3",
        posted: "2023-05-17T12:00:00Z"
    },
    {
        id: "fallback4",
        title: "Engineering Intern",
        company: {
            name: "Innovative Engineering"
        },
        location: {
            city: "Boston",
            area: ["Boston", "Massachusetts", "United States"]
        },
        description: "Join our engineering team as an intern to work on cutting-edge projects. Requirements: Currently pursuing a degree in Engineering. Strong problem-solving skills. Responsibilities: Assist in designing and testing prototypes. Collaborate with senior engineers on projects. Benefits: Hands-on experience with latest technologies. Mentorship from experienced engineers. Opportunity to work on real-world projects.",
        salary: {
            min: 58000,
            max: 58000,
            hourlyMin: 28,
            hourlyMax: 28
        },
        url: "https://example.com/job4",
        posted: "2023-05-18T12:00:00Z"
    },
    {
        id: "fallback5",
        title: "Design Intern",
        company: {
            name: "Creative Studios"
        },
        location: {
            city: "Los Angeles",
            area: ["Los Angeles", "California", "United States"]
        },
        description: "Looking for a talented Design Intern to join our creative team. Requirements: Currently pursuing a degree in Graphic Design, UI/UX, or related field. Proficiency in design software. Responsibilities: Assist in creating visual assets for clients. Collaborate with the design team on projects. Benefits: Build a professional portfolio. Work with experienced designers. Exposure to client projects.",
        salary: {
            min: 50000,
            max: 50000,
            hourlyMin: 24,
            hourlyMax: 24
        },
        url: "https://example.com/job5",
        posted: "2023-05-19T12:00:00Z"
    },
    {
        id: "fallback6",
        title: "Healthcare Intern",
        company: {
            name: "MedCare Solutions"
        },
        location: {
            city: "Seattle",
            area: ["Seattle", "Washington", "United States"]
        },
        description: "Join our healthcare team as an intern to gain valuable experience in the medical field. Requirements: Currently pursuing a degree in Healthcare Administration, Nursing, or related field. Strong communication skills. Responsibilities: Assist with patient care coordination. Support administrative functions. Benefits: Exposure to healthcare operations. Mentorship from healthcare professionals. Valuable industry experience.",
        salary: {
            min: 52000,
            max: 52000,
            hourlyMin: 25,
            hourlyMax: 25
        },
        url: "https://example.com/job6",
        posted: "2023-05-20T12:00:00Z"
    },
    {
        id: "fallback7",
        title: "Education Intern",
        company: {
            name: "Learning Innovations"
        },
        location: {
            city: "Austin",
            area: ["Austin", "Texas", "United States"]
        },
        description: "Seeking an Education Intern to assist with curriculum development and educational programs. Requirements: Currently pursuing a degree in Education or related field. Passion for teaching and learning. Responsibilities: Help develop educational materials. Assist with program coordination. Benefits: Experience in educational program development. Mentorship from education professionals. Opportunity to impact student learning.",
        salary: {
            min: 48000,
            max: 48000,
            hourlyMin: 23,
            hourlyMax: 23
        },
        url: "https://example.com/job7",
        posted: "2023-05-21T12:00:00Z"
    },
    {
        id: "fallback8",
        title: "Legal Intern",
        company: {
            name: "Justice Legal Group"
        },
        location: {
            city: "Washington",
            area: ["Washington", "DC", "United States"]
        },
        description: "Join our legal team as an intern to gain valuable experience in the legal field. Requirements: Currently pursuing a law degree. Strong research and writing skills. Responsibilities: Assist with legal research and document preparation. Support attorneys with case management. Benefits: Exposure to legal proceedings. Mentorship from experienced attorneys. Valuable industry experience.",
        salary: {
            min: 56000,
            max: 56000,
            hourlyMin: 27,
            hourlyMax: 27
        },
        url: "https://example.com/job8",
        posted: "2023-05-22T12:00:00Z"
    },
    {
        id: "fallback9",
        title: "Sales Intern",
        company: {
            name: "Growth Sales Inc."
        },
        location: {
            city: "Denver",
            area: ["Denver", "Colorado", "United States"]
        },
        description: "Looking for a motivated Sales Intern to join our team. Requirements: Currently pursuing a degree in Business, Marketing, or related field. Excellent communication skills. Responsibilities: Assist with sales outreach and lead generation. Support the sales team with customer management. Benefits: Sales training and development. Commission opportunities. Real-world sales experience.",
        salary: {
            min: 50000,
            max: 50000,
            hourlyMin: 24,
            hourlyMax: 24
        },
        url: "https://example.com/job9",
        posted: "2023-05-23T12:00:00Z"
    },
    {
        id: "fallback10",
        title: "Business Intern",
        company: {
            name: "Strategic Consultants"
        },
        location: {
            city: "Atlanta",
            area: ["Atlanta", "Georgia", "United States"]
        },
        description: "Join our consulting team as a Business Intern to work on client projects. Requirements: Currently pursuing a degree in Business Administration, Economics, or related field. Strong analytical skills. Responsibilities: Assist with market research and data analysis. Support consultants with client presentations. Benefits: Exposure to business consulting. Mentorship from experienced consultants. Valuable industry experience.",
        salary: {
            min: 54000,
            max: 54000,
            hourlyMin: 26,
            hourlyMax: 26
        },
        url: "https://example.com/job10",
        posted: "2023-05-24T12:00:00Z"
    },
    {
        id: "fallback11",
        title: "Social Work Intern",
        company: {
            name: "Community Support Services"
        },
        location: {
            city: "Portland",
            area: ["Portland", "Oregon", "United States"]
        },
        description: "Seeking a compassionate Social Work Intern to assist with community programs. Requirements: Currently pursuing a degree in Social Work or related field. Strong empathy and communication skills. Responsibilities: Support case management and client services. Assist with community outreach programs. Benefits: Hands-on experience in social services. Mentorship from experienced social workers. Opportunity to make a positive impact in the community.",
        salary: {
            min: 46000,
            max: 46000,
            hourlyMin: 22,
            hourlyMax: 22
        },
        url: "https://example.com/job11",
        posted: "2023-05-25T12:00:00Z"
    }
];

// Function to get fallback jobs filtered by industry
function getFallbackJobs(industry) {
    if (!industry) return fallbackJobs;
    
    // Map industry to job types - using exact category names from the profile
    const industryMap = {
        "it-telecom": ["Software Engineering Intern"],
        "marketing": ["Marketing Intern"],
        "accounting-finance": ["Finance Intern"],
        "engineering": ["Engineering Intern"],
        "creative-design": ["Design Intern"],
        "healthcare": ["Healthcare Intern"],
        "education": ["Education Intern"],
        "legal": ["Legal Intern"],
        "sales": ["Sales Intern"],
        "consultancy": ["Business Intern"],
        "social-work": ["Social Work Intern"]
    };
    
    const relevantTitles = industryMap[industry] || [];
    
    if (relevantTitles.length === 0) return fallbackJobs;
    
    return fallbackJobs.filter(job => 
        relevantTitles.some(title => job.title.includes(title))
    );
}

export async function GET(req) {
    // Get the industry from URL parameters
    const { searchParams } = new URL(req.url);
    const industry = searchParams.get('industry');
    
    if (!process.env.ADZUNA_APP_ID || !process.env.ADZUNA_APP_KEY) {
        console.error('Adzuna API credentials missing');
        // Return fallback data instead of error
        const fallbackData = getFallbackJobs(industry);
        return NextResponse.json({
            success: true,
            count: fallbackData.length,
            results: fallbackData,
            source: "fallback"
        });
    }

    try {
        // Map industry categories to better search terms
        const industrySearchTerms = {
            "it-telecom": ["software", "developer", "programming", "IT"],
            "marketing": ["marketing", "digital", "social media"],
            "accounting-finance": ["finance", "accounting", "financial"],
            "engineering": ["engineering", "mechanical", "electrical"],
            "creative-design": ["design", "creative", "graphic", "UI", "UX"],
            "healthcare": ["healthcare", "medical", "health"],
            "education": ["education", "teaching", "tutor"],
            "legal": ["legal", "law", "attorney", "paralegal"],
            "sales": ["sales", "business development"],
            "consultancy": ["consulting", "business", "strategy"],
            "social-work": ["social work", "community", "nonprofit"]
        };
        
        // Build the API URL with base parameters
        let apiUrl = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${process.env.ADZUNA_APP_ID}&app_key=${process.env.ADZUNA_APP_KEY}&results_per_page=20`;
        
        // Start with "internship" as the base search term
        let searchTerms = ["internship"];
        
        // Add industry-specific terms if available
        if (industry && industrySearchTerms[industry]) {
            // Get the mapped search terms for this industry
            searchTerms = [...searchTerms, industrySearchTerms[industry][0]];
        }
        
        // Add the search terms to the URL
        apiUrl += `&what=${encodeURIComponent(searchTerms.join(' '))}`;
        
        console.log("Fetching jobs from:", apiUrl);
        
        try {
            const response = await fetch(apiUrl);
            console.log("API response status:", response.status);

            if (!response.ok) {
                console.error('API response not OK:', response.status, response.statusText);
                const fallbackData = getFallbackJobs(industry);
                return NextResponse.json({
                    success: true,
                    count: fallbackData.length,
                    results: fallbackData,
                    source: "fallback"
                });
            }

            const data = await response.json();
            console.log("API response data count:", data.count);
            
            // Check if we have results
            if (!data.results || data.results.length === 0) {
                console.log("No results from API, using fallback data");
                const fallbackData = getFallbackJobs(industry);
                return NextResponse.json({
                    success: true,
                    count: fallbackData.length,
                    results: fallbackData,
                    source: "fallback"
                });
            }
            
            // Format the response before sending
            const formattedJobs = data.results.map(job => {
                // Calculate hourly rate (assuming 40 hours/week, 52 weeks/year)
                const hourlyMin = job.salary_min ? Math.round((job.salary_min / (40 * 52))) : null;
                const hourlyMax = job.salary_max ? Math.round((job.salary_max / (40 * 52))) : null;
                
                return {
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
                        max: job.salary_max,
                        hourlyMin: hourlyMin,
                        hourlyMax: hourlyMax
                    },
                    url: job.redirect_url,
                    posted: job.created
                };
            });

            return NextResponse.json({
                success: true,
                count: formattedJobs.length,
                results: formattedJobs,
                source: "api"
            });
        } catch (apiError) {
            console.error('API request failed:', apiError);
            // Return fallback data if API request fails
            const fallbackData = getFallbackJobs(industry);
            return NextResponse.json({
                success: true,
                count: fallbackData.length,
                results: fallbackData,
                source: "fallback"
            });
        }
    } catch (error) {
        console.error('Error in job API route:', error);
        // Return fallback data for any error
        const fallbackData = getFallbackJobs(industry);
        return NextResponse.json({
            success: true,
            count: fallbackData.length,
            results: fallbackData,
            source: "fallback"
        });
    }
}