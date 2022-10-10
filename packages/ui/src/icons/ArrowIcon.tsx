import React from 'react';

function ArrowIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M0.68 2.82L9.84 12L0.68 21.18L3.5 24L15.5 12L3.5 0L0.68 2.82Z"
        fill="#606060"
      />
    </svg>
  );
}

export default ArrowIcon;
