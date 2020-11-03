/* eslint-disable react/button-has-type */
import React from 'react';

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  color?: string;
  outline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

function Button({
  className = '',
  color = 'primary',
  outline = false,
  children = '',
  type = 'button',
  disabled = false,
  onClick,
}: ButtonProps) {
  if (color === 'primary') {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`px-4 py-2 rounded-md shadow-xl focus:outline-none outline-none focus:shadow-outline  disabled:cursor-not-allowed ${
          outline
            ? 'bg-transparent border border-primary-500 text-primary-500 disabled:bg-gray-200 disabled:text-primary-500'
            : 'bg-primary-500 text-white disabled:bg-primary-200 disabled:text-gray-900'
        } ${className}
        `}
      >
        {children}
      </button>
    );
  }
  if (color === 'success') {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`px-4 py-2 rounded-md focus:outline-none outline-none focus:shadow-outline mr-3 ${
          outline
            ? 'bg-transparent border border-green-700 text-green-700 disabled:bg-gray-200 disabled:text-green-700 disabled:cursor-not-allowed'
            : 'bg-green-700 text-white disabled:bg-green-400 disabled:text-gray-900 disabled:cursor-not-allowed'
        }`}
      >
        {children}
      </button>
    );
  }
  if (color === 'danger') {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`px-4 py-2 rounded-md focus:outline-none outline-none focus:shadow-outline mr-3 ${
          outline
            ? 'bg-transparent border border-red-700 text-red-700 disabled:bg-gray-200 disabled:text-red-700 disabled:cursor-not-allowed'
            : 'bg-red-700 text-white disabled:bg-red-400 disabled:text-gray-900 disabled:cursor-not-allowed'
        }`}
      >
        {children}
      </button>
    );
  }
}

export default Button;
