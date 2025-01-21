import { NextResponse } from 'next/server';

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

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Job fetch error:', error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}