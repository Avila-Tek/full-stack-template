import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  ChangeEvent,
} from 'react';

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  > {
  label: string;
  labelSrOnly?: boolean;
  notMargin?: boolean;
  onChange?: (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  children?: React.ReactNode;
  _ref?: React.LegacyRef<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >;
}

export default function Input({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  children,
  className = '',
  labelSrOnly = false,
  notMargin = false,
  _ref = null,
  ...rest
}: InputProps) {
  if (type === 'textarea') {
    return (
      <>
        <label
          htmlFor={name}
          className={`block ${notMargin ? 'mb-0' : 'mb-4'} ${className}`}
        >
          <span
            className={`text-gray-700 text-base ${
              labelSrOnly ? 'sr-only' : ''
            }`}
          >
            {label}
            {rest.required && <span className="text-red-500"> * </span>}
          </span>
          <textarea
            id={name}
            name={name}
            defaultValue={value}
            className="form-textarea mt-1 block w-full disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700 bg-gray-200"
            onChange={onChange}
          />
        </label>
      </>
    );
  }
  if (type === 'select') {
    return (
      <label
        htmlFor={name}
        className={`block ${notMargin ? 'mb-0' : 'mb-4'} ${className}`}
      >
        <span
          className={`text-gray-700 text-base ${labelSrOnly ? 'sr-only' : ''}`}
        >
          {label}
          {rest.required && <span className="text-red-500"> * </span>}
        </span>
        <select
          name={name}
          id={name}
          defaultValue={value}
          onChange={onChange}
          className="form-select block w-full mt-1 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700"
          disabled={rest.disabled}
        >
          {children}
        </select>
      </label>
    );
  }
  return (
    <label
      htmlFor={name}
      className={`block ${notMargin ? 'mb-0' : 'mb-4'} ${className}`}
    >
      <span
        className={`text-gray-700 text-base ${labelSrOnly ? 'sr-only' : ''}`}
      >
        {label}
        {rest.required && <span className="text-red-500"> * </span>}
      </span>
      <input
        name={name}
        id={name}
        type={type}
        value={value}
        placeholder={placeholder || label}
        className="form-input mt-1 block w-full disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700 bg-gray-100 rounded-xl"
        onChange={onChange}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref={_ref as React.LegacyRef<HTMLInputElement>}
        {...rest}
      />
    </label>
  );
}
