import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactChild | Array<React.ReactChild>;
  title: string;
}

function Layout({ children, title = '' }: LayoutProps) {
  return (
    <>
      <Sidebar />
      <section className="relative lg:ml-64 bg-gray-100">
        <Navbar />
        <div className="relative pt-16 z-0">
          <div className="px-4 lg:py-6 lg:px-14 mx-auto w-full">
            <h2 className="text-2xl uppercase text-indigo-900 font-semibold ellipsis">
              {title}
            </h2>
          </div>
        </div>
        <div className="px-4 lg:py-3 lg:px-14 mx-auto w-full z-10  min-h-screen">
          {children}
        </div>
        <div className="px-4 lg:py-6 lg:px-14 mx-auto w-full z-10">
          <Footer />
        </div>
      </section>
    </>
  );
}

export default Layout;
