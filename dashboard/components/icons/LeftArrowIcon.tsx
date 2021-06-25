import React from 'react';

function LeftArrowIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="9"
      height="14"
      fill="none"
      viewBox="0 0 9 14"
      className={className}
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

export default LeftArrowIcon;
