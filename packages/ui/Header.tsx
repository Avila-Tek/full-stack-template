'use client';

import React from 'react';

export function Header({
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>) {
  return <h1 {...props}>{props.children}</h1>;
}
