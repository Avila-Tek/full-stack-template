import React from 'react';

function EyeIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M17.7141 9.13435C18.1091 9.65102 18.1091 10.3485 17.7141 10.8643C16.4699 12.4885 13.4849 15.8327 9.99993 15.8327C6.51493 15.8327 3.52993 12.4885 2.28576 10.8643C2.09358 10.617 1.98926 10.3126 1.98926 9.99935C1.98926 9.68608 2.09358 9.38174 2.28576 9.13435C3.52993 7.51018 6.51493 4.16602 9.99993 4.16602C13.4849 4.16602 16.4699 7.51018 17.7141 9.13435V9.13435Z"
        stroke="#606060"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
        stroke="#606060"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default EyeIcon;
