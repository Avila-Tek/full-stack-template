import React from 'react';

function RightArrowIcon({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 9 14"
      className={className}
      {...props}
    >
      <path
        stroke="#4A4A4A"
        strokeLinecap="round"
        strokeWidth="2"
        d="M1.92 13l5.815-5.93a.1.1 0 000-.14L1.92 1"
      />
    </svg>
  );
}

export default RightArrowIcon;
