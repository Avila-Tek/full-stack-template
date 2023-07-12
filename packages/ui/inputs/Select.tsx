import React from 'react';

export interface SelectProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  label?: string;
  defaultSelect?: number;
  optionsList?: { value: number; name: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  function _Select(
    { label = '', onChange, defaultSelect, className = '', children, ...props },
    ref
  ) {
    return (
      <label className="block">
        {label !== '' ? (
          <span className="text-neutral-200 text-sm font-medium mb-2 ">
            {label}
          </span>
        ) : null}
        <select
          ref={ref}
          defaultValue={defaultSelect}
          onChange={onChange}
          className={`border-[0.5px]  border-solid border-neutral-100 appearance-none outline-none block w-full rounded py-2 px-3 placeholder:text-neutral-100  ${className}`}
          {...props}
        >
          {children}
        </select>
      </label>
    );
  }
);
