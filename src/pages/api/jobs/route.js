export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const response = await fetch('https://findwork.dev/api/jobs/', {
            headers: {
                'Authorization': `Token ${process.env.FINDWORK_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`API returned ${response.status}`);
        }

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        console.error('Jobs API error:', error);
        return res.status(500).json({ error: 'Failed to fetch jobs' });
    }
}