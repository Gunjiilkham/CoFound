import axios from 'axios';

export default async function handler(req, res) {
    try {
        console.log('Starting API call to Findwork...');
        console.log('API Key:', process.env.NEXT_PUBLIC_FINDWORK_API_KEY); // Debugging

        const response = await axios.get('https://findwork.dev/api/jobs/', {
            headers: {
                Authorization: `Token ${process.env.NEXT_PUBLIC_FINDWORK_API_KEY}`,
            },
        });

        console.log('Findwork API response:', response.data);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching jobs in API route:', error.message);
        console.error('Full error:', error.response?.data || error);

        res.status(500).json({ error: 'Failed to fetch jobs', details: error.message });
    }
}
