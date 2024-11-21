import React, { useState } from 'react';
import '../styles/profile.css';

const Profile = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [major, setMajor] = useState('');
  const [college, setCollege] = useState('');
  const [gradYear, setGradYear] = useState('');
  const [field, setField] = useState('');
  const [careerGoals, setCareerGoals] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');

  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Updated handleSubmit with validation and error handling
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate file type and existence
    if (!file || file.type !== 'application/pdf') {
      setMessage('Please select a valid PDF file.');
      return;
    }

    const formData = new FormData();
    formData.append('pdf', file);

    setUploading(true);
    setMessage('Uploading...');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to upload file.');
      }

      setMessage(result.message || 'File uploaded successfully!');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleProfileSubmit = (event) => {
    event.preventDefault();

    if (!name || !age || !major || !college || !gradYear) {
      setMessage('All fields are required.');
      return;
    }

    setMessage('Profile updated successfully!');
  };

  return (
    <div className="profile-container">
      <h1>Profile Page</h1>
      <form onSubmit={handleSubmit}>
        {/* Personal Information Section */}
        <section>
          <h2>Personal Information</h2>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
            />
          </div>

          <div>
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, State"
            />
          </div>
        </section>

        {/* Education Information Section */}
        <section>
          <h2>Education Information</h2>
          <div>
            <label htmlFor="major">Major:</label>
            <input
              type="text"
              id="major"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              placeholder="Enter your major"
            />
          </div>

          <div>
            <label htmlFor="college">College/University:</label>
            <input
              type="text"
              id="college"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              placeholder="Enter your college"
            />
          </div>

          <div>
            <label htmlFor="gradYear">Graduation Year:</label>
            <input
              type="number"
              id="gradYear"
              value={gradYear}
              onChange={(e) => setGradYear(e.target.value)}
              placeholder="Enter your graduation year"
            />
          </div>
        </section>

        {/* Career Section */}
        <section>
          <h2>Career</h2>
          <div>
            <label htmlFor="field">Field:</label>
            <select
              id="field"
              value={field}
              onChange={(e) => setField(e.target.value)}
            >
              <option value="" disabled>
                -- Select an option --
              </option>
              <option value="accounting">Accounting</option>
              {/* Add more options here */}
            </select>
          </div>
        </section>

        {/* Upload Section */}
        <div>
          <h1>Upload</h1>
          <div>
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
            <button type="submit" disabled={uploading}>
              {uploading ? 'Uploading...' : 'Upload PDF'}
            </button>
          </div>
          {message && <p>{message}</p>}
        </div>

        <div>
          <button type="submit">Update Profile</button>
        </div>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Profile;
