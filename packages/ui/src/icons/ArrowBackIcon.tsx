import React from 'react';

function ArrowBackIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <mask
        id="mask0_849_9883"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="2"
        y="2"
        width="12"
        height="12"
      >
        <path
          d="M12.5273 7.33664H5.08066L8.334 4.08331C8.594 3.82331 8.594 3.39664 8.334 3.13664C8.20944 3.01181 8.04034 2.94165 7.864 2.94165C7.68765 2.94165 7.51855 3.01181 7.394 3.13664L3.00066 7.52997C2.74066 7.78997 2.74066 8.20997 3.00066 8.46997L7.394 12.8633C7.654 13.1233 8.074 13.1233 8.334 12.8633C8.594 12.6033 8.594 12.1833 8.334 11.9233L5.08066 8.66997H12.5273C12.894 8.66997 13.194 8.36997 13.194 8.00331C13.194 7.63664 12.894 7.33664 12.5273 7.33664Z"
          fill="black"
        />
      </mask>
      <g mask="url(#mask0_849_9883)">
        <rect width="16" height="16" fill="currentColor" />
      </g>
    </svg>
  );
}

export default ArrowBackIcon;
