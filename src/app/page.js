import React from 'react';
import Head from 'next/head'; 
import Image from 'next/image';
import Link from 'next/link';

const Page = () => { 
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Tindernships</title>
            </Head>

            <div className="page-container">
                <header className="header">
                    <h1 className="title">Tindernship</h1>
                    <h2 className="subtitle">Love Your Career</h2>
                </header>

                <article className="logo-container">
                    <Image
                        id="homeLogo"
                        src="/favicon2.ico"
                        width={250}
                        height={250}
                        alt="Tindernship."
                    />
                </article>

                <main>
                    <section id="home">
                        <center>
                            <p>Discover personalized internship suggestions in only a few swipes.</p>
                            <div className="button-container">
                                <Link href="/signin">
                                    <button className="auth-button">Sign In</button>
                                </Link>
                                <Link href="/signup">
                                    <button className="auth-button">Sign Up</button>
                                </Link>
                            </div>
                        </center>
                    </section>
                </main>

                <footer className="footer">
                    <p>&copy; 2024 Tindernships. All rights reserved.</p>
                </footer>
            </div>
        </>
    );
};

export default Page;
