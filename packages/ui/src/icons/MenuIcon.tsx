import React from 'react';

function MenuIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={`h-4 w-4 ${className}`}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      {...props}
    >
      <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
    </svg>
  );
}

export default MenuIcon;
