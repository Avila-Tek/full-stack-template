import React from 'react';

function UserIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <mask
        id="mask0_180_16963"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="3"
        y="3"
        width="14"
        height="14"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.333 6.66732C13.333 8.50898 11.8413 10.0007 9.99967 10.0007C8.15801 10.0007 6.66634 8.50898 6.66634 6.66732C6.66634 4.82565 8.15801 3.33398 9.99967 3.33398C11.8413 3.33398 13.333 4.82565 13.333 6.66732ZM3.33301 15.0007C3.33301 12.784 7.77467 11.6673 9.99967 11.6673C12.2247 11.6673 16.6663 12.784 16.6663 15.0007V15.834C16.6663 16.2923 16.2913 16.6673 15.833 16.6673H4.16634C3.70801 16.6673 3.33301 16.2923 3.33301 15.834V15.0007Z"
          fill="black"
        />
      </mask>
      <g mask="url(#mask0_180_16963)">
        <rect width="20" height="20" fill="#858C94" />
      </g>
    </svg>
  );
}

export default UserIcon;
