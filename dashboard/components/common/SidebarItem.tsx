import React from 'react';
import Link from 'next/link';

interface SidebarItemProps {
  href?: string;
  as?: string;
  icon?: React.ReactChild;
  text: string;
  isCollapsible?: boolean;
  subLinks?: Array<{
    href?: string;
    as?: string;
    text?: string;
  }>;
}

export default function SidebarItem({
  href,
  as,
  icon,
  text,
  isCollapsible = false,
  subLinks = [],
}: SidebarItemProps) {
  const [isOpen, setOpen] = React.useState(false);
  const toggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setOpen(!isOpen);
  };
  if (!isCollapsible) {
    return (
      <li className="items-center px-6 border-transparent hover:bg-gray-200 border-r-4 hover:border-cool-gray-500">
        <Link href={href} as={as}>
          <a className="text-gray-600 text-xs uppercase py-3 font-semibold flex flex-row flex-wrap w-full">
            {icon} <span className="my-auto">{text}</span>
          </a>
        </Link>
      </li>
    );
  }
  return (
    <li className="items-center px-6 border-transparent hover:bg-gray-200 border-r-4 hover:border-cool-gray-500">
      <button
        type="button"
        className="p-0 m-0 mb-1 bg-transparent focus:outline-none outline-none text-gray-600 text-xs uppercase py-3 font-semibold flex flex-row flex-wrap w-full"
        onClick={toggle}
      >
        {icon}
        <span className="my-auto">{text}</span>
        {isOpen ? (
          <svg
            fill="currentColor"
            className="ml-auto w-5 h-5 text-gray-600"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            fill="currentColor"
            className="ml-auto w-5 h-5 text-gray-600"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>
      <ul
        className={`${
          isOpen ? 'flex' : 'hidden'
        } lg:flex-col lg:min-w-full flex flex-col list-none`}
      >
        {subLinks.map((link) => (
          <li className="items-center" key={link.as}>
            <Link href={link.href} as={link.as}>
              <a className="text-gray-600 text-xs uppercase py-3 font-semibold block">
                {link.text}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}
