import React from 'react';

function LocationOnIcon({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.33301 6.67668C3.33301 4.09668 5.41967 2.01001 7.99967 2.01001C10.5797 2.01001 12.6663 4.09668 12.6663 6.67668C12.6663 9.45668 9.71967 13.29 8.51301 14.75C8.24634 15.07 7.75967 15.07 7.49301 14.75C6.27967 13.29 3.33301 9.45668 3.33301 6.67668ZM6.33301 6.67668C6.33301 7.59668 7.07967 8.34334 7.99967 8.34334C8.91967 8.34334 9.66634 7.59668 9.66634 6.67668C9.66634 5.75668 8.91967 5.01001 7.99967 5.01001C7.07967 5.01001 6.33301 5.75668 6.33301 6.67668Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default LocationOnIcon;
