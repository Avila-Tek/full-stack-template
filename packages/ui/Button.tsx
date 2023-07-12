'use client';

import React from 'react';

export function Button({
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return <button {...props}>{props.children}</button>;
}
