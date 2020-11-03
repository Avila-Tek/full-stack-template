import React from 'react';

function Footer() {
  return (
    <>
      <footer className="block py-4">
        <div className="container mx-auto">
          <hr className="mb-4 border-b-1 border-gray-300" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full px-4">
              <div className="text-sm text-gray-600 font-semibold py-1">
                © {new Date().getFullYear()} C.A. Cigarrera Bigott Sucs.
                Desarrollado por{' '}
                <a
                  href="https://avilatek.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-800 text-sm font-semibold py-1"
                >
                  Avila Tek
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
