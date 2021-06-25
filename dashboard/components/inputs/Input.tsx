/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

export interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
}

function _Input({ label, className = '', name, ...rest }: InputProps) {
  return (
    <label className="block w-full" htmlFor={name}>
      <span className="text-primary-500 font-semibold">{label}</span>
      <input
        className={`mt-1 block w-full text-neutral-800 rounded-md border-neutral-200 shadow-sm focus:border-0 focus:ring focus:ring-primary-100 focus:ring-opacity-50 ${className}`}
        name={name}
        {...rest}
      />
    </label>
  );
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => <_Input ref={ref} {...props} />
);
