import React from 'react';

export interface TextAreaProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  label?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function _TextArea({ label = '', className = '', onChange, ...props }, ref) {
    return (
      <label className="block">
        {label !== '' ? (
          <span className="text-neutral-200 text-sm font-medium mb-2">
            {label}
          </span>
        ) : null}
        <textarea
          className={`${
            label !== '' ? ' ' : ''
          } border-[0.5px] border-solid border-neutral-100 appearance-none outline-none block w-full rounded py-2 px-3 placeholder:text-neutral-100  ${className}`}
          ref={ref}
          onChange={onChange}
          {...props}
        />
      </label>
    );
  }
);
