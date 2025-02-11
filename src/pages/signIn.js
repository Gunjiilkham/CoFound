import React, { useState } from 'react';
import { useRouter } from 'next/router';
import '../app/globals.css';
import '../styles/SignIn.css';
import NavBar from '../app/components/NavBar';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { username, password };

    try {
      const response = await fetch('/api/signIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('User signed in successfully!');
      } else {
        setError(data.message || 'Error signing in');
      }
    } catch (err) {
      console.error('Error signing in:', err);
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
          <h2 className="font-semibold text-xl mb-4">Sign In</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
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

            <div className="mb-4">
              <button type="submit">Sign In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
