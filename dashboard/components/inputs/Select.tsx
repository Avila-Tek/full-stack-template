/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

export interface SelectProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  label: string;
}

function _Select({
  label,
  className = '',
  children,
  name,
  ...rest
}: SelectProps) {
  return (
    <label className="block w-full" htmlFor={name}>
      <span className="text-primary-500 font-semibold">{label}</span>
      <select
        className={`mt-1 block w-full text-neutral-800 rounded-md border-neutral-200 shadow-sm focus:border-0 focus:ring focus:ring-primary-100 focus:ring-opacity-50 ${className}`}
        name={name}
        {...rest}
      >
        {children}
      </select>
    </label>
  );
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => <_Select ref={ref} {...props} />
);
