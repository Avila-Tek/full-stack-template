import React from 'react';

function CancelIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 14"
      className={className}
      {...props}
    >
      <path
        fill="#a3a3a3"
        d="M7.213 13.48a6.603 6.603 0 100-13.207 6.603 6.603 0 000 13.206z"
      />
      <path
        fill="black"
        d="M9.998 10.22l.518-.515-2.768-2.79.31-.409 2.45-2.456-.519-.519-2.828 2.807-.36-.352-2.445-2.444-.52.518L5.41 5.638c.222.222.446.442.682.67l.562.55-.352.37-2.476 2.464.52.52 2.857-2.82.281.294.054.073 2.46 2.461z"
      />
    </svg>
  );
}

export default CancelIcon;
