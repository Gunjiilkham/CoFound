"use client";

import React, { useState, useEffect } from "react";
import fetchJobs from "../fetchJobs";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const loadJobs = async () => {
      const jobData = await fetchJobs();
      setJobs(jobData);
    };
    loadJobs();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Available Jobs
      </h2>
      {jobs.length === 0 ? (
        <p className="text-center text-gray-600">No job listings available at the moment.</p>
      ) : (
        <ul>
          {jobs.map(job => (
            <li
              key={job.id}
              className="bg-white p-5 rounded-lg mb-4 hover:shadow-md hover:-translate-y-1 transform transition duration-200"
            >
              <div className="flex items-center mb-4">
                <img
                  src={job.logo || 'https://via.placeholder.com/50'}
                  alt={job.company_name}
                  className="w-12 h-12 mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold text-blue-700 mb-1">{job.title}</h3>
                  <p className="text-gray-600">{job.company_name}</p>
                </div>
              </div>
              <p className="text-gray-600">{job.location}</p>
              <p className="text-gray-600 mb-3">{job.description.slice(0, 150)}...</p>
              <p className="text-sm text-gray-500 mb-2">Posted on: {job.date_posted}</p>
              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Apply Here
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobListings;
