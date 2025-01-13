"use client";

import React, { useState, useEffect } from "react";
import fetchJobs from "../fetchJobs";

const JobListings = () => {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadJobs = async () => {
            try {
                setLoading(true);
                setError(null);
                const jobData = await fetchJobs();
                setJobs(jobData);
            } catch (err) {
                console.error('Error loading jobs:', err);
                setError(err.message || 'Failed to load job listings');
            } finally {
                setLoading(false);
            }
        };

        loadJobs();
    }, []);

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-8"></div>
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="mb-6 bg-white p-6 rounded-lg shadow">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-gray-200 rounded mr-4"></div>
                                <div>
                                    <div className="h-4 bg-gray-200 rounded w-64 mb-2"></div>
                                    <div className="h-3 bg-gray-200 rounded w-32"></div>
                                </div>
                            </div>
                            <div className="h-3 bg-gray-200 rounded w-24 mb-3"></div>
                            <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
                            <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">Error Loading Jobs</h3>
                            <p className="mt-2 text-sm text-red-700">{error}</p>
                            <button 
                                onClick={() => window.location.reload()} 
                                className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Available Jobs
            </h2>
            {jobs.length === 0 ? (
                <div className="text-center bg-white p-6 rounded-lg shadow">
                    <p className="text-gray-600">No job listings available at the moment.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {jobs.map(job => (
                        <div
                            key={job.id}
                            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition duration-200"
                        >
                            <div className="flex items-center mb-4">
                                <img
                                    src={job.logo}
                                    alt={`${job.company_name} logo`}
                                    className="w-12 h-12 object-contain rounded mr-4"
                                    onError={(e) => {
                                        e.target.src = '/placeholder-company-logo.png';
                                    }}
                                />
                                <div>
                                    <h3 className="text-xl font-semibold text-blue-600">
                                        {job.title}
                                    </h3>
                                    <p className="text-gray-600">{job.company_name}</p>
                                </div>
                            </div>
                            <div className="mb-3">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                    {job.location}
                                </span>
                            </div>
                            <p className="text-gray-700 mb-4 line-clamp-3">
                                {job.description}
                            </p>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">
                                    Posted: {job.date_posted}
                                </span>
                                <a
                                    href={job.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Apply Now
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default JobListings;