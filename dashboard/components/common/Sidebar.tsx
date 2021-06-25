import React from 'react';
import Link from 'next/link';
import UserDropdown from './UserDropdown';
import NotificationDropdown from './NotificationDropdown';
import SidebarItem from './SidebarItem';
import routes from '../../routes';

function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState(false);
  return (
    <>
      <nav className="lg:left-0 lg:block lg:fixed lg:top-0 lg:bottom-0 lg:overflow-y-auto lg:flex-row lg:flex-no-wrap lg:overflow-hidden shadow-xl bg-white text-white flex flex-wrap items-center justify-between relative lg:w-64 z-10 py-4">
        <div className="lg:flex-col lg:items-stretch lg:min-h-full lg:flex-no-wrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-gray-600 ml-6 lg:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setCollapseShow(true);
            }}
          >
            <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 20 20">
              <path
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
                fillRule="evenodd"
              />
            </svg>
          </button>
          {/* Brand */}
          <Link href="/">
            <a>
              <div className="hidden lg:flex px-5 pt-3 cursor-pointer items-center">
                <a className="lg:block text-left text-gray-700 mr-0 inline-block whitespace-no-wrap text-sm uppercase font-bold px-3">
                  Nombre del producto
                </a>
              </div>
            </a>
          </Link>
          {/* User */}
          <ul className="lg:hidden items-center flex flex-wrap list-none px-6">
            <li className="hidden sm:inline-block relative">
              <NotificationDropdown />
            </li>
            <li className="inline-block relative px-6">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={`lg:flex lg:flex-col lg:items-stretch lg:opacity-100 lg:relative lg:mt-4 lg:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 ${
              collapseShow ? 'bg-white m-2 py-3 px-6' : 'hidden'
            }`}
          >
            {/* Collapse header */}
            <div className="lg:min-w-full lg:hidden block pb-4 border-b border-solid border-gray-300 px-6">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link href="/">
                    <a>Nombre del producto</a>
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-gray-700  lg:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={(e) => {
                      e.preventDefault();
                      setCollapseShow(false);
                    }}
                  >
                    <svg
                      fill="currentColor"
                      className="w-6 h-6"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            {/* Navigation */}
            <ul className="lg:flex-col lg:min-w-full flex flex-col list-none">
              {routes.map((route) => (
                <SidebarItem {...route} key={route.text} />
              ))}
            </ul>
            {/* Divider
            <hr className="my-4 lg:min-w-full" />
            <h6 className="lg:min-w-full text-gray-600 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Documentation
            </h6> */}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Sidebar;
