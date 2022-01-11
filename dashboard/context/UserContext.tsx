import React from 'react';
import { User } from '../models';

export type TUserContext = {
  user?: User;
  setUser?: React.Dispatch<React.SetStateAction<User>>;
};

export const UserContext = React.createContext<TUserContext>({});

interface UserContextProviderProps {
  children: React.ReactNode;
}

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = React.useState<User>(null);
  const context = React.useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
}
