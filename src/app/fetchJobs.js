require('dotenv').config();
const axios = require('axios');

async function fetchJobs() {
    try {
        const response = await axios.get('https://findwork.dev/api/jobs/', {
            headers: {
                'Authorization': `Token ${process.env.FINDWORK_API_KEY}`, // Use your API key securely
            },
        });

        // Map the response to a simplified format
        const jobs = response.data.results.map(job => ({
            id: job.id,
            title: job.role,
            company_name: job.company_name,
            location: job.location || 'Remote',
            description: job.text.replace(/<[^>]+>/g, ''), // Remove HTML tags
            url: job.url,
            date_posted: new Date(job.date_posted).toLocaleDateString(),
            logo: job.logo,
        }));

        return jobs;
    } catch (error) {
        console.error('Error fetching jobs:', error.message);
        return [];
    }
}

module.exports = fetchJobs;
