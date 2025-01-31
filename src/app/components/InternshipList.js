'use client';

import { useState, useEffect } from 'react';
import fetchJobs from '../fetchJobs';

export default function InternshipList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await fetchJobs();
        setJobs(data.results);
      } catch (err) {
        setError(err.message || 'Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  if (loading) return <div className="text-center p-4">Loading internships...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Available Internships ({jobs.length})</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <div 
            key={job.id} 
            className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
            <div className="mb-2 text-gray-600">
              <p>{job.company.display_name}</p>
              <p>{job.location.display_name}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500">
                {job.description.length > 200 
                  ? `${job.description.substring(0, 200)}...` 
                  : job.description}
              </p>
            </div>
            <div className="mb-2 text-sm">
              <p>Salary Range: ${Math.round(job.salary_min).toLocaleString()} - ${Math.round(job.salary_max).toLocaleString()}</p>
              <p>Posted: {new Date(job.created).toLocaleDateString()}</p>
            </div>
            <a 
              href={job.redirect_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Apply Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
} 