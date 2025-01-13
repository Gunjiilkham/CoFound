import axios from 'axios';

async function fetchJobs() {
    try {
        // Make request to our local API route instead of directly to findwork.dev
        const response = await axios.get('/api/jobs');
        
        // Format the response
        const jobs = response.data.results.map(job => ({
            id: job.id,
            title: job.role,
            company_name: job.company_name,
            location: job.location || 'Remote',
            description: job.text ? job.text.replace(/<[^>]+>/g, '') : 'No description available',
            url: job.url,
            date_posted: new Date(job.date_posted).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            }),
            logo: job.logo || '/placeholder-company-logo.png',
        }));

        return jobs;

    } catch (error) {
        console.error('Error fetching jobs:', error);
        throw new Error(
            error.response?.data?.error || 
            'Failed to fetch job listings. Please try again later.'
        );
    }
}

export default fetchJobs;