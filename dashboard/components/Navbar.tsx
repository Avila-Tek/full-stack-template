import React from 'react';
import Link from 'next/link';
import UserDropdown from './UserDropdown';
import NotificationIcon from './NotificationIcon';
import useUser from '../hooks/useUser';

interface NavbarProps {
  hasBg?: boolean;
}

function Navbar({ hasBg = false }: NavbarProps) {
  const [user] = useUser();
  return (
    <>
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent lg:flex-row lg:flex-no-wrap lg:justify-start flex items-center p-4 text-gray-900">
        <div className="w-full mx-auto items-center flex justify-between lg:flex-no-wrap flex-wrap lg:px-10 px-4">
          <Link href="/app">
            <a
              className={`${
                hasBg ? 'text-white' : 'text-primary-500'
              } text-xs uppercase hidden lg:inline-block font-semibold`}
            >
              Home
            </a>
          </Link>

          <ul className="flex-col lg:flex-row list-none items-center hidden lg:flex lg:space-x-2">
            <NotificationIcon _id={user?._id} hasBg={hasBg} />
            <UserDropdown />
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
