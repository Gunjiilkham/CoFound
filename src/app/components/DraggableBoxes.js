import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export default function DraggableBox({ userField }) {
  const [currentBox, setCurrentBox] = useState(1);
  const controls = useAnimation();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentJobIndex, setCurrentJobIndex] = useState(0);

  // Fetch jobs when component mounts or userField changes
  useEffect(() => {
    fetchJobs();
  }, [userField]);

  const fetchJobs = async () => {
    setLoading(true);
    setError('');
    try {
      // Use the userField prop if provided, otherwise try to get from localStorage
      let field = userField;
      
      if (!field) {
        const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
        field = userProfile.field || '';
      }
      
      const response = await fetch(`/api/jobs${field ? `?industry=${field}` : ''}`);
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      
      const data = await response.json();
      setJobs(data.results || []);
      
      // Reset current job index when getting new jobs
      setCurrentJobIndex(0);
    } catch (error) {
      setError('Error fetching jobs: ' + error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle drag end
  const handleDragEnd = (_, info) => {
    if (info.offset.x < -100) {
      handleSwipeLeft();
    } else if (info.offset.x > 100) {
      handleSwipeRight();
    }
  };

  const handleSwipeLeft = async () => {
    await controls.start({ x: "-100vw", opacity: 0 });
    // Move to next job
    setCurrentJobIndex((prev) => (prev + 1) % Math.max(jobs.length, 1));
    await controls.start({ x: 0, opacity: 1 });
  };

  const handleSwipeRight = () => {
    // Navigate to job application URL
    const currentJob = jobs[currentJobIndex];
    if (currentJob && currentJob.url) {
      window.open(currentJob.url, '_blank');
    }
  };

  // Function to extract sections from job description
  const extractSections = (description) => {
    const sections = {
      overview: [],
      responsibilities: [],
      requirements: [],
      benefits: []
    };
    
    const paragraphs = description.split(/\n\n|\.\s/);
    
    paragraphs.forEach(paragraph => {
      const p = paragraph.trim().toLowerCase();
      if (!p) return;
      
      if (p.includes('requirement') || p.includes('qualification') || p.includes('you should') || 
          p.includes('you must') || p.includes('you need') || p.includes('minimum') || 
          p.includes('degree') || p.includes('experience') || p.includes('skills')) {
        sections.requirements.push(paragraph.trim());
      } else if (p.includes('responsib') || p.includes('you will') || p.includes('duties') || 
                 p.includes('what you\'ll do') || p.includes('day to day') || p.includes('role')) {
        sections.responsibilities.push(paragraph.trim());
      } else if (p.includes('benefit') || p.includes('perks') || p.includes('we offer') || 
                 p.includes('compensation') || p.includes('salary') || p.includes('package')) {
        sections.benefits.push(paragraph.trim());
      } else if (!p.includes('job description') && !p.includes('about the role') && !p.includes('about this job')) {
        sections.overview.push(paragraph.trim());
      }
    });
    
    return sections;
  };

  // Get current job
  const currentJob = jobs.length > 0 ? jobs[currentJobIndex] : null;
  const jobSections = currentJob ? extractSections(currentJob.description) : null;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <motion.div
        className="w-[32rem] h-[36rem] bg-white flex flex-col justify-between items-center font-bold text-lg cursor-pointer rounded-lg shadow-lg transition-transform z-10 p-6 relative"
        drag="x"
        dragConstraints={{ left: -200, right: 200 }}
        onDragEnd={handleDragEnd}
        animate={controls}
      >
        {/* Box Content */}
        <div className="flex-grow flex flex-col justify-center items-center overflow-y-auto w-full">
          {loading ? (
            <div className="text-center text-gray-600">Loading jobs...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : jobs.length === 0 ? (
            <div className="text-center text-gray-600 p-6">
              <p className="mb-4">No jobs available in this field.</p>
              <p>Try updating your profile with a different field of interest.</p>
            </div>
          ) : !currentJob ? (
            <div className="text-center text-gray-600">No jobs available</div>
          ) : (
            <div className="text-left w-full px-2">
              <h3 className="font-bold text-xl text-blue-900 mb-2 break-words hyphens-auto">
                {currentJob.title}
              </h3>
              <p className="text-gray-700 font-medium">{currentJob.company.name}</p>
              <p className="text-gray-600 text-sm mb-3">
                {currentJob.location.city || currentJob.location.display_name}
                {currentJob.location.area && currentJob.location.area.length > 1 && `, ${currentJob.location.area[1]}`}
              </p>
              
              {currentJob.salary.hourlyMin && (
                <p className="text-sm text-gray-700 mb-4 bg-blue-50 p-2 rounded-md inline-block">
                  {currentJob.salary.hourlyMin === currentJob.salary.hourlyMax ? (
                    <>💰 ${currentJob.salary.hourlyMin} per hour</>
                  ) : (
                    <>💰 ${currentJob.salary.hourlyMin} - ${currentJob.salary.hourlyMax} per hour</>
                  )}
                </p>
              )}
              
              <div className="text-sm text-gray-600 mt-3 max-h-64 overflow-y-auto bg-gray-50 p-4 rounded-md">
                {/* Overview */}
                {jobSections.overview.length > 0 && (
                  <div className="mb-3">
                    <p className="font-medium text-gray-700 mb-2">Overview:</p>
                    {jobSections.overview.slice(0, 3).map((paragraph, index) => (
                      <p key={index} className="pl-4 border-l-2 border-blue-200 mb-2">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
                
                {/* Responsibilities */}
                {jobSections.responsibilities.length > 0 && (
                  <div className="mb-3">
                    <p className="font-medium text-gray-700 mb-2">Responsibilities:</p>
                    {jobSections.responsibilities.slice(0, 3).map((paragraph, index) => (
                      <p key={index} className="pl-4 border-l-2 border-green-200 mb-2">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
                
                {/* Requirements */}
                {jobSections.requirements.length > 0 && (
                  <div className="mb-3">
                    <p className="font-medium text-gray-700 mb-2">Requirements:</p>
                    {jobSections.requirements.slice(0, 3).map((paragraph, index) => (
                      <p key={index} className="pl-4 border-l-2 border-yellow-200 mb-2">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
                
                {/* Benefits */}
                {jobSections.benefits.length > 0 && (
                  <div className="mb-3">
                    <p className="font-medium text-gray-700 mb-2">Benefits:</p>
                    {jobSections.benefits.slice(0, 2).map((paragraph, index) => (
                      <p key={index} className="pl-4 border-l-2 border-purple-200 mb-2">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
                
                {/* Fallback if no sections were identified */}
                {jobSections.overview.length === 0 && 
                 jobSections.responsibilities.length === 0 && 
                 jobSections.requirements.length === 0 && 
                 jobSections.benefits.length === 0 && (
                  <div>
                    <p className="font-medium text-gray-700 mb-2">Job Description:</p>
                    {currentJob.description.split(/\n\n|\.\s/).slice(0, 5).map((paragraph, index) => (
                      paragraph.trim() && !paragraph.toLowerCase().includes("job description") ? (
                        <p key={index} className="mb-3 pl-4 border-l-2 border-blue-200">
                          {paragraph.trim().replace(/^•\s*/, '')}
                        </p>
                      ) : null
                    ))}
                  </div>
                )}
                
                <p className="text-blue-500 italic text-xs mt-2">
                  {jobs.length > 1 ? 'Swipe left to see more opportunities' : 'This is the only matching job'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Buttons at the Bottom */}
        <div className="flex justify-between w-full mt-4 px-4">
          <button
            className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition w-1/3 font-medium"
            onClick={handleSwipeLeft}
            disabled={jobs.length <= 1}
          >
            ⬅ Next
          </button>

          <button
            className="px-5 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition w-1/3 font-medium"
            onClick={handleSwipeRight}
            disabled={!currentJob}
          >
            Apply ➡
          </button>
        </div>
      </motion.div>
    </div>
  );
}
