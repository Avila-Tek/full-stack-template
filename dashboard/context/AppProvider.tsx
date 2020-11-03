import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { v4 as uuid } from 'uuid';
import AppContext from './AppContext';
import Toast from '../components/Toast';

interface AppProviderProps {
  children?: React.ReactNode;
}

export default function AppContextProvider({ children }: AppProviderProps) {
  const [alerts, setAlerts] = React.useState([]);
  const notify = (content = '', type = '') => {
    const id = uuid();
    setAlerts((_alerts) => [
      ..._alerts,
      {
        content,
        type,
        id,
        timeOut: setTimeout(() => {
          setAlerts((__alerts) => __alerts.filter((alert) => alert.id !== id));
        }, 5000),
      },
    ]);
  };
  const onDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const { id } = e.currentTarget.dataset;
    setAlerts((_alerts) => _alerts.filter((alert) => alert.id !== id));
  };

  return (
    <AppContext.Provider value={{ notify }}>
      {children}
      <div className="fixed py-4 top-0 right-0 w-full md:w-2/3 lg:w-1/4 z-50">
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
                content={alert.content}
                id={alert.id}
                onClick={onDelete}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </AppContext.Provider>
  );
}
