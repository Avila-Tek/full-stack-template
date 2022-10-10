import React from 'react';

function CheckFullIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="16" height="16" rx="8" fill="#3ABCB0" />
      <path
        d="M4.5 8.5L6.5 10.5L11.5 5.5"
        stroke="#FEFEFE"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default CheckFullIcon;
