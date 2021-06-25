import React from 'react';

function CorrectIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 15 14"
      className={className}
      {...props}
    >
      <path
        fill="#00AB66"
        d="M7.718 13.974a6.771 6.771 0 100-13.542 6.771 6.771 0 000 13.542z"
      />
      <path
        fill="#fff"
        d="M4.174 7.541l2.742 2.664 4.855-4.622-1.31-1.382-3.507 3.34-1.41-1.45-1.37 1.45z"
      />
    </svg>
  );
}

export default CorrectIcon;
