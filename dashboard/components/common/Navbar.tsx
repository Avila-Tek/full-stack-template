import React from 'react';
import Link from 'next/link';
import UserDropdown from './UserDropdown';
import NotificationDropdown from './NotificationDropdown';

export default function Navbar() {
  return (
    <>
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent lg:flex-row lg:flex-no-wrap lg:justify-start flex items-center p-4 text-gray-900">
        <div className="w-full mx-auto items-center flex justify-between lg:flex-no-wrap flex-wrap lg:px-10 px-4">
          <Link href="/app">
            <a className="text-primary-500 text-xs uppercase hidden lg:inline-block font-semibold">
              Home
            </a>
          </Link>

          <ul className="flex-col lg:flex-row list-none items-center hidden lg:flex lg:space-x-2">
            <NotificationDropdown />
            <UserDropdown />
          </ul>
        </div>
      </nav>
    </>
  );
}
