import React from 'react';

function ActionsIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 21 22"
      className={className}
      {...props}
      {...props}
    >
      <path
        fill="currentColor"
        d="M7.4.6a1.3 1.3 0 000 2.6H10a1.3 1.3 0 100-2.6H7.4z"
      />
      <path
        fill="currentColor"
        d="M.9 4.5a2.6 2.6 0 012.6-2.6 3.9 3.9 0 003.9 3.9H10a3.9 3.9 0 003.9-3.9 2.6 2.6 0 012.6 2.6v7.8H10.54l1.68-1.68a1.3 1.3 0 00-1.838-1.84l-3.9 3.9a1.3 1.3 0 000 1.84l3.9 3.9a1.3 1.3 0 001.838-1.84l-1.68-1.68H16.5v3.9a2.6 2.6 0 01-2.6 2.6H3.5a2.6 2.6 0 01-2.6-2.6V4.5zm15.6 7.8h2.6a1.3 1.3 0 010 2.6h-2.6v-2.6z"
      />
    </svg>
  );
}

export default ActionsIcon;
