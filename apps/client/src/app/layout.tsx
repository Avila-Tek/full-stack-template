'use client';

import React from 'react';
import { ApolloWrapper } from '@/context/ApolloContext';
import { NextAuthProvider } from '@/context/AuthContext';
import '@/styles/index.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          <NextAuthProvider>{children}</NextAuthProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
