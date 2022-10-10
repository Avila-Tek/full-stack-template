import React from 'react';

function TrashIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <mask
        id="mask0_588_2277"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="4"
        y="3"
        width="12"
        height="15"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.9165 3.83333H14.9998C15.4582 3.83333 15.8332 4.20833 15.8332 4.66667C15.8332 5.125 15.4582 5.5 14.9998 5.5H4.99984C4.5415 5.5 4.1665 5.125 4.1665 4.66667C4.1665 4.20833 4.5415 3.83333 4.99984 3.83333H7.08317L7.67484 3.24167C7.82484 3.09167 8.0415 3 8.25817 3H11.7415C11.9582 3 12.1748 3.09167 12.3248 3.24167L12.9165 3.83333ZM6.6665 18C5.74984 18 4.99984 17.25 4.99984 16.3333V8C4.99984 7.08333 5.74984 6.33333 6.6665 6.33333H13.3332C14.2498 6.33333 14.9998 7.08333 14.9998 8V16.3333C14.9998 17.25 14.2498 18 13.3332 18H6.6665Z"
          fill="black"
        />
      </mask>
      <g mask="url(#mask0_588_2277)">
        <rect y="0.5" width="20" height="20" fill="currentColor" />
      </g>
    </svg>
  );
}

export default TrashIcon;
