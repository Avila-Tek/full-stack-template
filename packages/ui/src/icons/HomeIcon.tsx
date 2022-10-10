import React from 'react';

function HomeIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M8.33148 16.1062V11.9396H11.6648V16.1062C11.6648 16.5646 12.0398 16.9396 12.4981 16.9396H14.9981C15.4565 16.9396 15.8315 16.5646 15.8315 16.1062V10.2729H17.2481C17.6315 10.2729 17.8148 9.79791 17.5231 9.54791L10.5565 3.27291C10.2398 2.98958 9.75648 2.98958 9.43982 3.27291L2.47315 9.54791C2.18982 9.79791 2.36482 10.2729 2.74815 10.2729H4.16482V16.1062C4.16482 16.5646 4.53982 16.9396 4.99815 16.9396H7.49815C7.95648 16.9396 8.33148 16.5646 8.33148 16.1062Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default HomeIcon;
