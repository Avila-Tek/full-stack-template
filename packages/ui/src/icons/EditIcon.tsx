import React from 'react';

function EditIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <mask
        id="mask0_248_20144"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="2"
        y="2"
        width="15"
        height="15"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.3944 4.4571C16.7032 4.76585 16.7032 5.2646 16.3944 5.57335L14.9457 7.0221L11.9769 4.05335L13.4257 2.6046C13.5736 2.45636 13.7744 2.37305 13.9838 2.37305C14.1932 2.37305 14.394 2.45636 14.5419 2.6046L16.3944 4.4571ZM2.37402 16.2292V13.8225C2.37402 13.7117 2.41361 13.6167 2.49277 13.5375L11.1299 4.90043L14.0986 7.86918L5.45361 16.5063C5.38236 16.5854 5.27944 16.625 5.17652 16.625H2.76986C2.54819 16.625 2.37402 16.4508 2.37402 16.2292Z"
          fill="black"
        />
      </mask>
      <g mask="url(#mask0_248_20144)">
        <rect width="19" height="19" fill="#2EA89D" />
      </g>
    </svg>
  );
}

export default EditIcon;
