import React from 'react';

function SearchIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <mask
        id="mask0_706_7813"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="2"
        y="2"
        width="16"
        height="16"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.6553 12.0596H13.3137L16.847 15.6096C17.1887 15.9513 17.1887 16.5096 16.847 16.8513C16.5053 17.193 15.947 17.193 15.6053 16.8513L12.0637 13.3096V12.6513L11.8387 12.418C10.672 13.418 9.08034 13.9346 7.38867 13.6513C5.07201 13.2596 3.22201 11.3263 2.93867 8.99298C2.50534 5.46798 5.47201 2.50131 8.99701 2.93464C11.3303 3.21798 13.2637 5.06798 13.6553 7.38464C13.9387 9.07631 13.422 10.668 12.422 11.8346L12.6553 12.0596ZM4.56367 8.30964C4.56367 10.3846 6.23867 12.0596 8.31367 12.0596C10.3887 12.0596 12.0637 10.3846 12.0637 8.30964C12.0637 6.23464 10.3887 4.55964 8.31367 4.55964C6.23867 4.55964 4.56367 6.23464 4.56367 8.30964Z"
          fill="black"
        />
      </mask>
      <g mask="url(#mask0_706_7813)">
        <rect width="20" height="20" fill="currentColor" />
      </g>
    </svg>
  );
}

export default SearchIcon;
