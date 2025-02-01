'use client';

import { useState } from 'react';

export default function InternshipList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInternships = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/jobs');
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch internships');
      }
      
      setJobs(data.results);
      setError(null);
    } catch (err) {
      console.error('API Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to truncate description
  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center gap-6">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-2xl font-bold">Available Internships</h1>
          <button 
            onClick={fetchInternships}
            className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Refresh Listings'}
          </button>
        </div>
        
        {error && (
          <div className="w-full text-red-500 p-4 border border-red-300 rounded bg-red-50">
            Error: {error}
          </div>
        )}
        
        {jobs.length > 0 ? (
          <div className="w-full grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map(job => (
              <div key={job.id} className="border rounded-xl p-6 hover:shadow-lg transition-shadow bg-white">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-lg text-blue-900">{job.title}</h3>
                </div>
                
                <div className="mb-3">
                  <p className="text-gray-700 font-medium">{job.company.name}</p>
                  <p className="text-gray-600 text-sm">{job.location.city}</p>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">
                  {truncateText(job.description)}
                </p>
                
                {job.salary.min && (
                  <p className="text-sm text-gray-700 mb-3">
                    Salary: ${Math.round(job.salary.min).toLocaleString()} - ${Math.round(job.salary.max).toLocaleString()}
                  </p>
                )}
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    Posted: {new Date(job.posted).toLocaleDateString()}
                  </span>
                  <a 
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-600 transition-colors"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : !loading && (
          <div className="text-center text-gray-500 py-10">
            Click 'Refresh Listings' to load internships
          </div>
        )}
      </div>
    </div>
  );
} 