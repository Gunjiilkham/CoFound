import '../app/globals.css';
import '../styles/SignIn.css';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import NavBar from '../app/components/NavBar';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    const userData = {
      username,
      password,
    };
    console.log(process.env.DATABASE_URL);
    try {
      const response = await fetch('/api/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('User signed up successfully!');
        // Redirect using Next.js router
        router.push('/profile'); 
      } else {
        setError(data.message || 'Error signing up');
      }
    } catch (err) {
      console.error('Error signing up:', err);
      setError('Internal server error');
    }
  };

  return (
    <div className="page-container min-h-screen flex flex-col">
      <nav className="w-full fixed top-0 left-0 bg-black ppx-10 z-50">
          <NavBar />
      </nav>
  
      <div className="flex-grow flex justify-center items-center pt-20">
        <div className="form-container p-4 mt-12">
          <h2 className="font-semibold text-xl mb-4">Sign Up</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />

            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />

            <div className="mb-4">
              <button className="items-center" type="submit">Sign Up!</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
