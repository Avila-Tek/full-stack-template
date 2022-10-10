import React from 'react';

function LockIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <mask
        id="mask0_180_16935"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="3"
        y="1"
        width="14"
        height="18"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.9997 7.08333H14.1663V5.41667C14.1663 3.11667 12.2997 1.25 9.99967 1.25C7.69967 1.25 5.83301 3.11667 5.83301 5.41667V7.08333H4.99967C4.08301 7.08333 3.33301 7.83333 3.33301 8.75V17.0833C3.33301 18 4.08301 18.75 4.99967 18.75H14.9997C15.9163 18.75 16.6663 18 16.6663 17.0833V8.75C16.6663 7.83333 15.9163 7.08333 14.9997 7.08333ZM9.99967 14.5833C9.08301 14.5833 8.33301 13.8333 8.33301 12.9167C8.33301 12 9.08301 11.25 9.99967 11.25C10.9163 11.25 11.6663 12 11.6663 12.9167C11.6663 13.8333 10.9163 14.5833 9.99967 14.5833ZM7.49967 5.41667V7.08333H12.4997V5.41667C12.4997 4.03333 11.383 2.91667 9.99967 2.91667C8.61634 2.91667 7.49967 4.03333 7.49967 5.41667Z"
          fill="black"
        />
      </mask>
      <g mask="url(#mask0_180_16935)">
        <rect width="20" height="20" fill="#858C94" />
      </g>
    </svg>
  );
}

export default LockIcon;
