import React from 'react';

function AddIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="21"
      fill="none"
      viewBox="0 0 20 21"
      className={className}
      {...props}
    >
      <path
        fill="currentColor"
        d="M11.125 9.76h3.233v1.722h-3.233v3.485H9.403v-3.485H6.17V9.76h3.233V6.275h1.722V9.76z"
      />
      <path
        fill="currentColor"
        d="M10.264 20.28a9.657 9.657 0 119.658-9.658 9.668 9.668 0 01-9.658 9.657zm0-18.316a8.656 8.656 0 108.658 8.658 8.667 8.667 0 00-8.658-8.658z"
      />
    </svg>
  );
}

export default AddIcon;
