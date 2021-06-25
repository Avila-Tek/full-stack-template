import React from 'react';

function IncorrectIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 15 14"
      className={className}
      {...props}
    >
      <path
        fill="#C02B2B"
        d="M7.718 13.937a6.771 6.771 0 100-13.542 6.771 6.771 0 000 13.542z"
      />
      <path fill="#fff" d="M10.774 6.21h-6.11v1.91h6.11V6.21z" />
    </svg>
  );
}

export default IncorrectIcon;
