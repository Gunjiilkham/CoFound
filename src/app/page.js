"use client"; // Ensure the file is treated as a client component

import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();


  return (
    <div className="page-container flex flex-col min-h-screen">
      <nav className="w-full bg-black sticky top-0 left-0">
        <header className="sticky w-full flex justify-between px-10 py-1 z-50 bg-black hover:drop-shadow-[0_10px_15px_rgba(0,0,0,0.7)] transition-shadow">
          <div className="flex items-center">
            <img src="/favicon2.ico" alt="Logo" className="h-10 w-10 mr-1"/>
              <h1 className="text-2xl font-serif leading-10 font-semibold text-slate-200 hover:italic">
              Tindernship</h1>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <button className="px-15 py-3 cursor-pointer rounded-full bg-slate-200 font-medium basis-1/2 hover:bg-slate-300">
              <a href="/signUp">
              Get Started</a>
            </button>
            <button className="px-6 py-3 cursor-pointer rounded-full bg-slate-200 font-medium basis-1/2 hover:bg-slate-300">
              <a href="/signIn">
              Log In</a>
            </button>
          </div>
        </header>
      </nav>

      <main className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/gradiant-background.jpg')" }}>
          <section className="text-center px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-slate-800">
              Love Your Career
            </h2>
            <p className="text-lg md:text-xl text-center text-slate-700 mb-8">
              Explore opportunities in just a few swipes.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="px-15 py-5 bg-blue-800 text-white font-medium rounded-full hover:bg-blue-900">
                <a href="/signUp">Get Started</a>
              </button>
            </div>
          </section>
      </main>

      <section
        className="min-h-screen w-full flex flex-col items-left place-content-start bg-cover bg-center"
        style={{ backgroundImage: "url('/crumpled-paper-background.jpg')" }}>
          <h2 className="text-3xl md:text-5xl font-bold text-left pt-10 mt-10 ml-10 text-slate-900">
            Tindernship is...
          </h2>
          <p className="text-xl md:text-xl italic text-right text-slate-800 pt-10 mr-10 mb-8">
            ... A platform created with the goal to connect university students to internships.
          </p>
          <p className="text-xl md:text-xl italic text-right text-slate-800 mr-10 mb-8">
            ... A simple swiping-based tool for finding personalized internships.
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-left pt-10 mt-10 ml-10 text-slate-900">
            Tindernship has...
          </h2>
          <p className="text-xl md:text-xl italic text-right text-slate-800 pt-10 mr-10 mb-8">
            ... An intricate database of internships and joblistings.
          </p>
          <p className="text-xl md:text-xl italic text-right text-slate-800 mr-10 mb-8">
            ... An AI-powered algorithm for connecting users to their desired internships.
          </p>
        <div className="flex gap-4 pt-10 justify-center">
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
    </div>
  );
};

export default Page;
