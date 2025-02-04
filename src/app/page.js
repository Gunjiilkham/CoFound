"use client"; // Ensure the file is treated as a client component

import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  return (
    <div className="page-container">
      <header className="header">
        <h1 className="title">Tindernship</h1>
        <h2 className="subtitle">Love Your Career</h2>
      </header>

      <main>
        <section id="home">
          <center>
            <p>Discover personalized internship suggestions in only a few swipes.</p>
            <div className="button-container">
              <button className="auth-button">
                <a href="/signIn">Sign In</a>
              </button>
              <button className="auth-button">
                <a href="/signUp">Sign Up</a>
              </button>
            </div>
          </center>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2024 Tindernships. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Page;
