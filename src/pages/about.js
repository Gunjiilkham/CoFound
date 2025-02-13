import React from 'react';
import '../styles/about.css'; // Importing custom CSS for this page

const About = () => {
  return (
    <div className="about-container mx-auto max-w-4xl">
      <header className="about-header">
        <h1>About Us</h1>
      </header>

      {/* Developer Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Gunjiilkham */}
        <div className="developer-card">
          <h3>Gunjiilkham Altanzaya</h3>
          <p>Add text</p>
        </div>

        {/* Naomi */}
        <div className="developer-card">
          <h3>Naomi Enogieru</h3>
          <p className="text-gray-600 mt-2">Add text</p>
        </div>

        {/* Kent */}
        <div className="developer-card">
          <h3>Kent Omolade</h3>
          <p>Add text</p>
        </div>

        {/* Ethan */}
        <div className="developer-card">
          <h3>Ethan Renkas</h3>
          <p>Add text</p>
        </div>
      </section>

      {/* Back to Home Link */}
      <footer>
        <a href="/" className="about-link">Back to Home</a>
      </footer>
    </div>
  );
};

export default About;
