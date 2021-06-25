import React from 'react';

function DeleteIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 11 14"
      className={className}
      {...props}
    >
      <path
        fill="currentColor"
        d="M3.727 4.615h-.001a.369.369 0 00-.37.37v6.347a.369.369 0 10.739 0V4.984a.369.369 0 00-.368-.369zM7.735 4.615a.369.369 0 00-.37.37v6.347a.369.369 0 10.739 0V4.984a.369.369 0 00-.369-.369zM5.731 4.615a.369.369 0 00-.37.37v6.347a.369.369 0 10.739 0V4.984a.369.369 0 00-.369-.369z"
      />
      <path
        fill="currentColor"
        d="M10.756 1.682h-3.6v-.484a.543.543 0 00-.542-.542h-1.76a.541.541 0 00-.541.542v.484h-3.6v1.9h.855v8.307a1.461 1.461 0 001.46 1.46H8.41a1.462 1.462 0 001.46-1.46V3.582h.9l-.013-1.9zm-6-.484a.093.093 0 01.092-.093h1.76a.094.094 0 01.092.093v.484H4.756v-.484zm4.653 10.69A1.013 1.013 0 018.398 12.9h-5.38a1.013 1.013 0 01-1.012-1.01V3.58h7.4l.003 8.307zm.9-8.756H1.155v-1h9.154v1z"
      />
    </svg>
  );
}

export default DeleteIcon;
