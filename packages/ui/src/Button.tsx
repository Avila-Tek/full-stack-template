/* eslint-disable react/button-has-type */
import React from 'react';

export function Button({
  className,
  children,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button
      className={` py-2 px-4 rounded w-full bg-primary-400 text-white font-semibold tracking-wide  ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
