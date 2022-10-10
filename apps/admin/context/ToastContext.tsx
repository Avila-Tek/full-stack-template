import React from 'react';
import * as Sentry from '@sentry/nextjs';
import { ClientOnlyPortal, Toast } from '@avila-tek/ui';
import { AnimatePresence, motion } from 'framer-motion';
import { v4 as uuid } from 'uuid';

interface IToastContext {
  alerts?: Array<TAlert>;
  notify?: (
    content: string,
    type: 'success' | 'error' | 'warning' | 'info',
    err?: Error
  ) => void;
}

type TAlert = {
  content: React.ReactNode;
  type: 'success' | 'error' | 'warning' | 'info';
  id: string;
  timeOut: NodeJS.Timeout;
};

interface ToastContextProvider {
  children?: React.ReactNode;
}

export const ToastContext = React.createContext<IToastContext>({
  alerts: [],
  notify: (content, type, err) => {
    console.log('');
  },
});

export function ToastContextProvider({ children }: ToastContextProvider) {
  const [alerts, setAlerts] = React.useState<TAlert[]>([]);
  const notify = React.useCallback(
    (content, type: 'success' | 'error' | 'warning' | 'info', err?: Error) => {
      if (err) {
        Sentry.captureException(err);
      }
      const id = uuid();
      setAlerts((_alerts) => [
        ..._alerts,
        {
          content,
          type,
          id,
          timeOut: setTimeout(() => {
            setAlerts((__alerts) =>
              __alerts.filter((alert) => alert.id !== id)
            );
          }, 6000),
        },
      ]);
    },
    []
  );
  React.useEffect(() => () => {
    if (Array.isArray(alerts) && alerts.length > 0) {
      alerts?.forEach((alert) => clearTimeout(alert.timeOut));
    }
  });
  const onDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const { id } = e.currentTarget.dataset;
    setAlerts((_alerts) => _alerts.filter((alert) => alert.id !== id));
  };
  const context = React.useMemo(() => ({ alerts, notify }), [alerts, notify]);
  return (
    <ToastContext.Provider value={context}>
      <ClientOnlyPortal selector="#toast">
        {alerts?.length > 0 ? (
          <div
            className="fixed py-4 px-4 md:px-0 w-full lg:w-1/4 right-0 top-10"
            style={{
              zIndex: 200,
            }}
          >
            <AnimatePresence>
              {alerts.map((alert) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{ opacity: 1, scale: 1.0 }}
                  exit={{
                    opacity: 0,
                    scale: 0.5,
                    transition: { duration: 0.2 },
                  }}
                  transition={{ type: 'spring', stiffness: 100 }}
                >
                  <Toast
                    key={alert.id}
                    type={alert.type}
                    id={alert.id}
                    onDelete={onDelete}
                  >
                    {alert.content}
                  </Toast>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : null}
      </ClientOnlyPortal>
      {children}
    </ToastContext.Provider>
  );
}
