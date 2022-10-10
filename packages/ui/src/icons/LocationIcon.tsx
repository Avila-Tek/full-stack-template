import React from 'react';

function LocationIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <mask
        id="mask0_220_18895"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="3"
        y="2"
        width="12"
        height="15"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.75 7.44922C3.75 4.54672 6.0975 2.19922 9 2.19922C11.9025 2.19922 14.25 4.54672 14.25 7.44922C14.25 10.5767 10.935 14.8892 9.5775 16.5317C9.2775 16.8917 8.73 16.8917 8.43 16.5317C7.065 14.8892 3.75 10.5767 3.75 7.44922ZM7.125 7.44922C7.125 8.48422 7.965 9.32422 9 9.32422C10.035 9.32422 10.875 8.48422 10.875 7.44922C10.875 6.41422 10.035 5.57422 9 5.57422C7.965 5.57422 7.125 6.41422 7.125 7.44922Z"
          fill="black"
        />
      </mask>
      <g mask="url(#mask0_220_18895)">
        <rect y="0.5" width="18" height="18" fill="#A6A6A6" />
      </g>
    </svg>
  );
}

export default LocationIcon;
