import React from 'react';

function UploadIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <mask
        id="mask0_118_7700"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="4"
        y="3"
        width="12"
        height="14"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.6667 13.5802H8.33341C7.87508 13.5802 7.50008 13.2052 7.50008 12.7468V8.58016H6.17508C5.43341 8.58016 5.06675 7.68016 5.59175 7.15516L9.41675 3.33016C9.57244 3.17412 9.78382 3.08643 10.0042 3.08643C10.2247 3.08643 10.4361 3.17412 10.5917 3.33016L14.4167 7.15516C14.9417 7.68016 14.5667 8.58016 13.8251 8.58016H12.5001V12.7468C12.5001 13.2052 12.1251 13.5802 11.6667 13.5802ZM15.0001 15.2468H5.00008C4.54175 15.2468 4.16675 15.6218 4.16675 16.0802C4.16675 16.5385 4.54175 16.9135 5.00008 16.9135H15.0001C15.4584 16.9135 15.8334 16.5385 15.8334 16.0802C15.8334 15.6218 15.4584 15.2468 15.0001 15.2468Z"
          fill="black"
        />
      </mask>
      <g mask="url(#mask0_118_7700)">
        <rect width="20" height="20" fill="#606060" />
      </g>
    </svg>
  );
}

export default UploadIcon;
