import React from 'react';

function CheckEmptyIcon({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <rect
        x="0.2"
        y="0.2"
        width="15.6"
        height="15.6"
        rx="7.8"
        stroke="#929292"
        strokeWidth="0.4"
      />
    </svg>
  );
}

export default CheckEmptyIcon;
