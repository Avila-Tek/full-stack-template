import React from 'react';

function ChevronLeftIcon({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <mask
        id="mask0_1129_2669"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="7"
        y="5"
        width="6"
        height="10"
      >
        <path
          d="M12.5001 5.58749C12.3444 5.43144 12.133 5.34375 11.9126 5.34375C11.6922 5.34375 11.4808 5.43144 11.3251 5.58749L7.5001 9.41249C7.1751 9.73749 7.1751 10.2625 7.5001 10.5875L11.3251 14.4125C11.6501 14.7375 12.1751 14.7375 12.5001 14.4125C12.8251 14.0875 12.8251 13.5625 12.5001 13.2375L9.26676 9.99582L12.5001 6.76249C12.8251 6.43749 12.8168 5.90415 12.5001 5.58749Z"
          fill="black"
        />
      </mask>
      <g mask="url(#mask0_1129_2669)">
        <rect width="20" height="20" fill="currentColor" />
      </g>
    </svg>
  );
}

export default ChevronLeftIcon;
