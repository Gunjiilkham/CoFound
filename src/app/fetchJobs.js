import axios from 'axios';

const fetchJobs = async () => {
    try {
        const response = await axios.get('/api/jobs');
        return response.data;
    } catch (error) {
        console.error('Error details:', {
            message: error.message,
            response: error.response?.data
        });
        throw new Error(error.response?.data?.error || 'Failed to fetch jobs');
    }
};

export default fetchJobs;