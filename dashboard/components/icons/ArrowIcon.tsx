import React from 'react';

function ArrowIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 6"
      className={className}
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M.797.275a.9.9 0 011.272 0l2.964 2.963L7.997.275a.9.9 0 111.272 1.272l-3.6 3.6a.9.9 0 01-1.272 0l-3.6-3.6a.9.9 0 010-1.272z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default ArrowIcon;
