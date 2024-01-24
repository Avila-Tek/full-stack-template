import UserInfo from '@/components/auth/UserInfo';
import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <div>
      Home
      <UserInfo />
      <Link href="/sign-in">Sign In</Link>
    </div>
  );
}
