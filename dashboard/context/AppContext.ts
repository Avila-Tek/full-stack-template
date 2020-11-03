import React from 'react';

type TAppContext = {
  alerts?: Array<{ type: string; content: React.ReactChild }>;
  notify?: (content: string, type: string) => void;
};

const AppContext = React.createContext<TAppContext>({
  alerts: [],
});

export default AppContext;
