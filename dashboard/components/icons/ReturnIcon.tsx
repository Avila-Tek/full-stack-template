import React from 'react';

function ReturnIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        stroke="#4A4A4A"
        strokeLinecap="round"
        strokeWidth="2"
        d="M7.51 13L1.695 7.07a.1.1 0 010-.14L7.509 1"
      />
    </svg>
  );
}

export default ReturnIcon;
