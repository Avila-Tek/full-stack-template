import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ClientOnlyPortalProps {
  children: React.ReactNode;
  selector: string;
}

export default function ClientOnlyPortal({
  children,
  selector,
}: ClientOnlyPortalProps) {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector);
    setMounted(true);
  }, [selector]);

  return mounted ? createPortal(children, ref.current) : null;
}
