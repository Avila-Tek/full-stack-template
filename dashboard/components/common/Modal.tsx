import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ClientOnlyPortal from './ClientOnlyPortal';

interface ModalProps {
  children?: React.ReactNode;
  isOpen?: boolean;
  className?: string;
}

const modalVariant = {
  initial: { opacity: 0 },
  isOpen: { opacity: 1 },
  exit: { opacity: 0 },
};
const containerVariant = {
  initial: { top: '-50%', transition: { type: 'spring' } },
  isOpen: { top: '50%' },
  exit: { top: '-50%' },
};

export default function Modal({
  children,
  isOpen = false,
  className = '',
}: ModalProps) {
  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-y-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-y-hidden');
    };
  }, [isOpen]);
  return (
    <AnimatePresence>
      {isOpen ? (
        <ClientOnlyPortal selector="#modal">
          <motion.section
            id="overlay"
            className="fixed inset-0 w-full h-full z-50 px-4"
            initial="initial"
            animate="isOpen"
            exit="exit"
            variants={modalVariant}
            style={{
              backgroundColor: `rgba(3, 8, 25, 0.3)`,
            }}
          >
            <motion.div
              className={`top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute z-40 overflow-y-auto rounded-lg ${className} py-2 modal-scrollbar max-h-full`}
              variants={containerVariant}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              {children}
            </motion.div>
          </motion.section>
        </ClientOnlyPortal>
      ) : null}
    </AnimatePresence>
  );
}
