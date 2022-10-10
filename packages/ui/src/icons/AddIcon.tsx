import React from 'react';

function AddIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <g id="Content / add">
        <mask
          id="mask0_44_5442"
          style={{ maskType: 'alpha' }}
          maskUnits="userSpaceOnUse"
          x="5"
          y="5"
          width="14"
          height="14"
        >
          <g id="Icon Mask">
            <path
              id="Round"
              d="M18 13H13V18C13 18.55 12.55 19 12 19C11.45 19 11 18.55 11 18V13H6C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11H11V6C11 5.45 11.45 5 12 5C12.55 5 13 5.45 13 6V11H18C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13Z"
              fill="black"
            />
          </g>
        </mask>
        <g mask="url(#mask0_44_5442)">
          <rect id="Color Fill" width="24" height="24" fill="currentColor" />
        </g>
      </g>
    </svg>
  );
}

export default AddIcon;
