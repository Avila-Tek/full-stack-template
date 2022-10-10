import React from 'react';
import { ToastCloseIcon, ToastErrorIcon, ToastSuccessIcon } from './icons';

interface ToastProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  type?: 'success' | 'error' | 'warning' | 'info';
  onDelete?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function Toast({
  type = 'info',
  id = '',
  onDelete,
  children,
  ...rest
}: ToastProps) {
  switch (type) {
    case 'success':
      return (
        <div
          className="max-w-xs mb-3 bg-green-500 rounded text-white w-full mx-auto px-4 py-2"
          role="alert"
          style={{ zIndex: 200 }}
          {...rest}
        >
          <div className="w-full flex flex-row flex-wrap">
            <div className="w-6 h-6 flex m-auto">
              <ToastSuccessIcon className="w-6 h-6 m-auto text-white" />
            </div>
            <div className="flex flex-row flex-wrap flex-grow pl-1">
              <span className="w-full flex flex-row flex-wrap">
                <p className="font-semibold text-white">¡Éxito!</p>
                <button
                  type="button"
                  className="ml-auto p-0 bg-transparent focus:outline-none outline-none"
                  data-id={id}
                  onClick={onDelete}
                >
                  <ToastCloseIcon className="w-4 h-4" />
                </button>
              </span>

              {typeof children === 'string' ? (
                <p className="text-sm">{children}</p>
              ) : (
                children
              )}
            </div>
          </div>
        </div>
      );
    case 'error':
      return (
        <div
          className="max-w-xs mb-3 bg-danger-100 rounded text-white w-full mx-auto px-4 py-2"
          role="alert"
          style={{ zIndex: 200 }}
          {...rest}
        >
          <div className="w-full flex flex-row flex-wrap">
            <div className="w-6 h-6 flex m-auto">
              <ToastErrorIcon className="w-6 h-6 text-white m-auto" />
            </div>
            <div className="flex flex-row flex-wrap flex-grow pl-1">
              <span className="w-full flex flex-row flex-wrap">
                <p className="font-semibold text-white">¡Error!</p>
                <button
                  type="button"
                  className="ml-auto p-0 bg-transparent focus:outline-none outline-none"
                  data-id={id}
                  onClick={onDelete}
                >
                  <ToastCloseIcon className="w-4 h-4" />
                </button>
              </span>
              {typeof children === 'string' ? (
                <p className="text-sm">{children}</p>
              ) : (
                children
              )}
            </div>
          </div>
        </div>
      );
    case 'warning':
      return (
        <div
          className="max-w-xs mb-3 bg-primary-500 rounded text-white w-full mx-auto px-4 py-2 shadow-md"
          role="alert"
          style={{ zIndex: 200 }}
          {...rest}
        >
          <div className="w-full flex flex-row flex-wrap">
            <div className="w-6 h-6 flex m-auto">
              <svg
                className="w-6 h-6 text-white m-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div className="flex flex-row flex-wrap flex-grow pl-1">
              <span className="w-full flex flex-row flex-wrap">
                <p className="font-semibold text-white">¡Cuidado!</p>
                <button
                  type="button"
                  className="ml-auto p-0 bg-transparent focus:outline-none outline-none"
                  data-id={id}
                  onClick={onDelete}
                >
                  <svg
                    fill="currentColor"
                    className="w-4 h-4"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </span>

              {typeof children === 'string' ? (
                <p className="text-sm">{children}</p>
              ) : (
                children
              )}
            </div>
          </div>
        </div>
      );
    case 'info':
      return (
        <div
          className="max-w-xs mb-3 bg-primary-300 rounded text-white w-full mx-auto px-4 py-2"
          role="alert"
          style={{ zIndex: 200 }}
          {...rest}
        >
          <div className="w-full flex flex-row flex-wrap">
            <div className="w-6 h-6 flex m-auto">
              <svg
                className="w-6 h-6 text-white m-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="flex flex-row flex-wrap flex-grow pl-1">
              <span className="w-full flex flex-row flex-wrap">
                <p className="font-semibold text-white">¡Información!</p>
                <button
                  type="button"
                  className="ml-auto p-0 bg-transparent focus:outline-none outline-none"
                  data-id={id}
                  onClick={onDelete}
                >
                  <svg
                    fill="currentColor"
                    className="w-4 h-4"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </span>

              {typeof children === 'string' ? (
                <p className="text-sm">{children}</p>
              ) : (
                children
              )}
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
}
