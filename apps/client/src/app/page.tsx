import React from 'react';
import { Inter } from 'next/font/google';
import Home from '../components/Home';

const inter = Inter({ subsets: ['latin'] });

export default function HomePage() {
  return (
    <main className={inter.className}>
      <Home />
    </main>
  );
}
