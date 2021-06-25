import React from 'react';
import Image from 'next/image';
import logo from '../public/logo.png';

function HomePage() {
  return (
    <div className="min-h-screen w-screen bg-white flex dark:bg-black">
      <section className="max-w-screen-md m-auto h-full">
        <article className="">
          <a href="https://avilatek.dev" target="_blank" rel="noreferrer">
            <Image
              className="w-96 h-auto text-center mx-auto"
              alt="Avila Tek Logo"
              src={logo}
            />
          </a>
          <h1 className="text-2xl text-center text-gray-700 dark:text-gray-100">
            Next.js Started template
          </h1>
          <p className="text-center text-white text-lg mt-2">
            <a
              href="https://github.com/Avila-Tek/next-template"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </p>
        </article>
      </section>
    </div>
  );
}

export default HomePage;
