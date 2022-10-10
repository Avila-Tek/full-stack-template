import React from 'react';

function MailIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <mask
        id="mask0_366_21192"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="1"
        y="3"
        width="18"
        height="14"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.33366 3.33398H16.667C17.5837 3.33398 18.3337 4.08398 18.3337 5.00065V15.0007C18.3337 15.9173 17.5837 16.6673 16.667 16.6673H3.33366C2.41699 16.6673 1.66699 15.9173 1.66699 15.0007L1.67533 5.00065C1.67533 4.08398 2.41699 3.33398 3.33366 3.33398ZM10.442 10.559L16.3337 6.87565C16.542 6.74232 16.667 6.51732 16.667 6.27565C16.667 5.71732 16.0587 5.38398 15.5837 5.67565L10.0003 9.16732L4.41699 5.67565C3.94199 5.38398 3.33366 5.71732 3.33366 6.27565C3.33366 6.51732 3.45866 6.74232 3.66699 6.87565L9.55866 10.559C9.82533 10.7257 10.1753 10.7257 10.442 10.559Z"
          fill="black"
        />
      </mask>
      <g mask="url(#mask0_366_21192)">
        <rect width="20" height="20" fill="#858C94" />
      </g>
    </svg>
  );
}

export default MailIcon;
