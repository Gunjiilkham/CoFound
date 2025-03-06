import React, { useState, useEffect } from 'react';
import DraggableBox from '../app/components/DraggableBoxes';
import NavBar from '../app/components/NavBar';

export default function Listings() {
  const [userField, setUserField] = useState('');
  const [loading, setLoading] = useState(true);

  // Check if user is logged in and get their field
  useEffect(() => {
    const userProfile = localStorage.getItem('userProfile');
    if (!userProfile) {
      // Redirect to profile page if no profile exists
      window.location.href = '/profile';
    } else {
      // Extract the user's field from their profile
      const profileData = JSON.parse(userProfile);
      setUserField(profileData.field || '');
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="w-full bg-black z-50">
        <NavBar />
      </nav>
      
      <div className="container mx-auto py-8 px-4 pt-20">
        <h1 className="text-3xl font-bold text-center mb-8">Job Listings</h1>
        <p className="text-center text-gray-600 mb-8">
          Swipe left to see more jobs, swipe right to apply
        </p>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-gray-500">Loading your personalized job listings...</p>
          </div>
        ) : (
          <>
            {userField && (
              <div className="text-center mb-6 bg-blue-50 p-3 rounded-md inline-block mx-auto">
                <p className="text-blue-700">
                  Showing internships in <span className="font-semibold">{userField}</span> field
                </p>
              </div>
            )}
            <DraggableBox userField={userField} />
          </>
        )}
      </div>
    </div>
  );
} 