import React from 'react';
import Head from 'next/head'; 

const Page: React.FC = () => { 
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Tindernships</title>
                {/* Link to your CSS file */}
                {/* <link rel="stylesheet" href="styles.css" /> */}
            </Head>
            <nav>
                <ul>
                    <li><a href="#home">Home</a></li> 
                    <li><a href="#user">Profile</a></li>
                    <li><a href="#listings">Listings</a></li>
                    <li><a href="#logIn">Log In</a></li>
                </ul>
            </nav>
            <header>
                <h1>Tindernships</h1>
                <h2>Love Your Career</h2>
            </header>
            <main>
                <section id="home">
                    <p>Discover personalized internship suggestions in only a few swipes.</p>
                    <ul>
                        <li><a href="#join">Sign Up</a></li>
                    </ul>
                </section>
            </main>
            <footer>
                <p>&copy; 2024 Tindernships. All rights reserved.</p>
            </footer>
        </>
    );
};

export default Page;  

