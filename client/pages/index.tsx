import React from 'react';

function HomePage() {
  return (
    <div className="min-h-screen w-screen bg-black flex">
      <section className="max-w-screen-md m-auto h-full">
        <article className="">
          <a href="https://avilatek.dev" target="_blank" rel="noreferrer">
            <img
              className="w-96 h-auto text-center mx-auto"
              alt="Avila Tek Logo"
              src="https://avilatek.dev/assets/images/logo_white.png"
            />
          </a>
          <h1 className="text-2xl text-center text-gray-100">
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
