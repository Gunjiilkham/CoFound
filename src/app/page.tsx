import React from 'react';
import Head from 'next/head'; 
import Image from 'next/image';

const Page: React.FC = () => { 
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Tindernships</title>
            </Head>

            <div style={{ backgroundColor: 'black', color: 'white', height: '100vh', margin: 0 }}>
            <header style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', height: '50vh' }}>
                <h1 style={{ fontWeight: 'bold', fontSize: '3em' }}>Tindernship</h1>
                <h2 style={{ fontWeight: 'bold', fontSize: '2em' }}>Love Your Career</h2>
            </header>

            <main>
                <section id="home">
                    <center>
                    <p>Discover personalized internship suggestions in only a few swipes.</p>
                    <button>Click Me!</button>
                    </center>
                </section>
            </main>


            <footer style={{ textAlign: 'center', padding: '20px',}}>
                    <p>&copy; 2024 Tindernships. All rights reserved.</p>
            </footer>

            </div>
        </>
    );
};

export default Page;