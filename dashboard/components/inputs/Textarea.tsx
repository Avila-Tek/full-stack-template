/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

export interface TextareaProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  label: string;
}
function _Textarea({ label, className = '', name, ...rest }: TextareaProps) {
  return (
    <label className="block w-full" htmlFor={name}>
      <span className="text-primary-500 font-semibold">{label}</span>
      <textarea
        className={`mt-1 block w-full text-neutral-800 rounded-md border-neutral-200 shadow-sm focus:border-0 focus:ring focus:ring-primary-100 focus:ring-opacity-50 ${className}`}
        name={name}
        {...rest}
      />
    </label>
  );
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => <_Textarea ref={ref} {...props} />
);
