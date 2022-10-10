import React from 'react';

function InventoryIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M16.6667 1.66669H3.33333C2.5 1.66669 1.66667 2.41669 1.66667 3.33335V5.84169C1.66667 6.44169 2.025 6.95835 2.5 7.25002V16.6667C2.5 17.5834 3.41667 18.3334 4.16667 18.3334H15.8333C16.5833 18.3334 17.5 17.5834 17.5 16.6667V7.25002C17.975 6.95835 18.3333 6.44169 18.3333 5.84169V3.33335C18.3333 2.41669 17.5 1.66669 16.6667 1.66669ZM12.5 11.6667H7.5V10H12.5V11.6667ZM16.6667 5.83335H3.33333V3.33335L16.6667 3.31669V5.83335Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default InventoryIcon;
