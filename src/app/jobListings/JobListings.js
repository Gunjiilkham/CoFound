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
      <ul>
        {jobs.map((job, index) => (
          <li
            key={index}
            className="bg-white p-5 rounded-lg mb-4 hover:shadow-md hover:-translate-y-1 transform transition duration-200"
          >
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              {job.title}
            </h3>
            <p className="text-gray-600">Company: {job.company_name}</p>
            <p className="text-gray-600">Location: {job.location}</p>
            <p className="text-gray-600 mb-3">{job.description}</p>
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
    </div>
  );
};

export default JobListings;
