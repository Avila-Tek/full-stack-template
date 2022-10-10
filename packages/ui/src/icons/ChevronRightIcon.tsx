import React from 'react';

function ChevronRightIcon({
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
        id="mask0_1129_2673"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="7"
        y="5"
        width="6"
        height="10"
      >
        <path
          d="M7.50009 13.2292L10.7334 9.99583L7.50009 6.7625C7.34404 6.60681 7.25635 6.39543 7.25635 6.175C7.25635 5.95457 7.34404 5.74319 7.50009 5.5875C7.82509 5.2625 8.35009 5.2625 8.67509 5.5875L12.5001 9.4125C12.8251 9.7375 12.8251 10.2625 12.5001 10.5875L8.67509 14.4125C8.35009 14.7375 7.82509 14.7375 7.50009 14.4125C7.18342 14.0875 7.17509 13.5542 7.50009 13.2292Z"
          fill="black"
        />
      </mask>
      <g mask="url(#mask0_1129_2673)">
        <rect width="20" height="20" fill="currentColor" />
      </g>
    </svg>
  );
}

export default ChevronRightIcon;
