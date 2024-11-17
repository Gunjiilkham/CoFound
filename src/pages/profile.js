import React, { useState } from 'react';
import '../styles/profile.css';


const Profile = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [major, setMajor] = useState('');
  const [college, setCollege] = useState('');
  const [gradYear, setGradYear] = useState('');

  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
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

        <div>
          <button type="submit">Update Profile</button>
        </div>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Profile;
