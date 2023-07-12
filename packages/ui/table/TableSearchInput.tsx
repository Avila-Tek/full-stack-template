import React from 'react';
import { useGlobalFilter } from './Table';

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (_value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export default function TableSearchInput({
  className = '',
  ...props
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>) {
  const [globalFilter, setGlobalFilter] = useGlobalFilter();
  return (
    <DebouncedInput
      value={globalFilter ?? ''}
      onChange={(value) => setGlobalFilter(String(value))}
      className={`mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black placeholder:text-sm dark:bg-slate-700 dark:placeholder:text-slate-200 dark:text-slate-50 dark:border-slate-500 ${className}`}
      placeholder="Search"
      type="search"
      {...props}
    />
  );
}
