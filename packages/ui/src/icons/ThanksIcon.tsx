import React from 'react';

function ThanksIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 368 369"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <rect
        width="368"
        height="369"
        rx="184"
        fill="#4FD6C9"
        fillOpacity="0.2"
      />
      <rect x="40" y="40.5" width="288" height="288" rx="144" fill="#3ABCB0" />
      <mask
        id="mask0_248_20128"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="118"
        y="134"
        width="132"
        height="101"
      >
        <path
          d="M159.028 215.016L131.991 187.69C130.535 186.215 128.559 185.386 126.498 185.386C124.437 185.386 122.46 186.215 121.005 187.69C117.966 190.761 117.966 195.722 121.005 198.793L153.574 231.711C156.613 234.782 161.521 234.782 164.56 231.711L246.996 148.393C250.035 145.322 250.035 140.361 246.996 137.29C245.54 135.815 243.564 134.986 241.503 134.986C239.442 134.986 237.465 135.815 236.01 137.29L159.028 215.016Z"
          fill="black"
        />
      </mask>
      <g mask="url(#mask0_248_20128)">
        <rect x="90.5" y="90" width="187" height="189" fill="white" />
      </g>
    </svg>
  );
}

export default ThanksIcon;
