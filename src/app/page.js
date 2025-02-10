"use client"; // Ensure the file is treated as a client component

import { useRouter } from 'next/navigation';
import InternshipList from './components/InternshipList';

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

      <section
        className="min-h-screen w-full flex flex-col items-left place-content-start bg-cover bg-center"
        style={{ backgroundImage: "url('/texturebackground.jpg')" }}>
          <h2 className="text-3xl md:text-5xl font-bold text-left pt-10 mt-10 ml-10 text-slate-200">
            Tindernship is...
          </h2>
          <p className="text-xl md:text-xl italic text-right text-slate-100 pt-10 mr-10 mb-8">
            ... A platform created with the goal to connect university students to internships.
          </p>
          <p className="text-xl md:text-xl italic text-right text-slate-100 mr-10 mb-8">
            ... A simple swiping-based tool for finding personalized internships.
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-left pt-10 mt-10 ml-10 text-slate-200">
            Tindernship has...
          </h2>
          <p className="text-xl md:text-xl italic text-right text-slate-100 pt-10 mr-10 mb-8">
            ... An intricate database of internships and joblistings.
          </p>
          <p className="text-xl md:text-xl italic text-right text-slate-100 mr-10 mb-8">
            ... An AI-powered algorithm for connecting users to their desired internships.
          </p>
        <div className="flex gap-4 pt-10 justify-center mb-10">
          <button className="px-15 py-5 bg-blue-800 text-white font-medium rounded-full hover:bg-blue-900">
            <a href="/signUp">Get Started</a>
          </button>
        </div>
      </section>

      <section
        className="min-h-screen w-full flex flex-col items-left place-content-start bg-cover bg-center">
          <h2 className="text-3xl md:text-5xl font-bold text-left pt-10 mt-10 ml-10 text-slate-900">
            Swiping Demo
          </h2>
          <p className="text-xl md:text-xl italic text-bold text-center text-slate-800 pt-10 mr-10 mb-8">
            WIP
          </p>
      </section>

      <footer className="bg-gray-700 text-slate-200 py-4 text-center">
        <p>&copy; 2024 Tindernship. All rights reserved.</p>
      </footer>

      <main className="min-h-screen bg-gray-50">
        <InternshipList />
      </main>
    </div>
  );
};

export default Page;
