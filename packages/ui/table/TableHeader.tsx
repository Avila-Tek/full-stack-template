import React from 'react';

export default function TableHeader({
  children,
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return (
    <div className={` ${className}`} {...props}>
      <div className="flex flex-wrap items-center">{children}</div>
    </div>
  );
}
