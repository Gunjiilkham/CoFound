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
  const [location, setLocation] = useState('')
  const [experience, setExperience] = useState('')
  const [skills, setSkills] = useState('')

  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleProfileSubmit = (event) => {
    event.preventDefault();

    if (!name || !age  || !major || !college || !gradYear) {
      setMessage('All fields are required.');
      return;
    }

    setMessage('Profile updated successfully!');
    
    // Optionally, you can reset the form after submission
    // setName('');
    // setAge('');
    // setEmail('');
    // setMajor('');
    // setCollege('');
    // setGradYear('');
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
  if (!file) {
      setMessage('Please select a file to upload.');
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
  
    if (!res.ok) {
      throw new Error('Failed to upload PDF');
    }
  
    setMessage('File uploaded successfully!');
  } catch (error) {
    setMessage(`Error: ${error.message}`);
  } finally {
    setUploading(false);
  }
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
              <option value="architecturalEngineering">Architectural Engineering</option>
              <option value="artAndDesign">Art and Design</option>
              <option value="animation">Animation</option>
              <option value="business">Business</option>
              <option value="computerProgramming">Computer Programming</option>
              <option value="computerSystems">Computer Systems</option>
              <option value="education">Education</option>
              <option value="engineering">Engineering</option>
              <option value="finance">Finance</option>
              <option value="gameDesign">Game Design</option>
              <option value="gameDevelopment">Game Development</option>
              <option value="law">Law</option>
              <option value="healthSciences">Health Sciences</option>
              <option value="humanServices">Human Services</option>
              <option value="informationTechnology">Information Technology</option>
              <option value="marketing">Marketing</option>
              <option value="sales">Sales</option>
              <option value="softwareEngineering">Software Engineering</option>
            </select>
          </div>

          <div>
            <label htmlFor="careerGoals">Career Goals:</label>
          </div>
          <div>
            <textarea 
              type="text"
              id="careerGoals"
              rows="4"
              cols="50" 
              value={careerGoals} 
              onChange={(e) => setCareerGoals(e.target.value)} 
              placeholder="Where do you see yourself in 10 years?"
            />
          </div>

          <div>
            <label htmlFor="experience">Experience:</label>
          </div>
          <div>
            <textarea 
              type="text"
              id="experience"
              rows="4"
              cols="50" 
              value={experience} 
              onChange={(e) => setExperience(e.target.value)} 
              placeholder="Noteable places of employment?"
            />
          </div>

          <div>
            <label htmlFor="skills">Skills:</label>
          </div>
          <div>
            <textarea 
              type="text"
              id="experience"
              rows="4"
              cols="50" 
              value={skills} 
              onChange={(e) => setSkills(e.target.value)} 
              placeholder="What are your strongest skillsets?"
            />
          </div>
        </section>
        
        <div>
        <h1>Upload </h1>
          <div onSubmit={handleSubmit}>
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
