import React from 'react';

export interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  children?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function _Input(
    { label = '', children, rightIcon, className = '', onChange, ...props },
    ref
  ) {
    return (
      <label className="block">
        {label !== '' ? (
          <span className="text-neutral-200 text-sm font-medium mb-2 ">
            {label}
          </span>
        ) : null}
        <div
          className={`w-full border-[0.5px] border-solid border-neutral-100 rounded flex items-center py-2 px-3 gap-4 ${className}`}
        >
          {children}
          <input
            className={`${
              label !== '' ? ' ' : ''
            } focus:ring-0  border-none appearance-none h-6 bg-transparent outline-none focus:outline-none focus:shadow-none w-full placeholder:text-neutral-100  tracking-wider  placeholder:text-sm  p-0 ${className}`}
            ref={ref}
            onChange={onChange}
            {...props}
          />
          {rightIcon}
        </div>
      </label>
    );
  }
);
