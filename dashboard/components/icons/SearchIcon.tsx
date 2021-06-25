import React from 'react';

function SearchIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 14"
      className={className}
      {...props}
    >
      <path
        fill="#A3A3A3"
        fillRule="evenodd"
        d="M5.4 2.2a3.2 3.2 0 100 6.4 3.2 3.2 0 000-6.4zM.6 5.4a4.8 4.8 0 118.712 2.78l3.853 3.854a.8.8 0 01-1.131 1.132L8.181 9.313A4.8 4.8 0 01.6 5.4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default SearchIcon;
