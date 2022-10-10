import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { User } from '../models';
import { CURRENT_USER } from '../graphql/queries';

export type TUserContext = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

export const UserContext = React.createContext<TUserContext>({
  user: null,
  setUser: () => {},
});

interface UserContextProviderProps {
  children: React.ReactNode;
}

export function UserContextProvider({ children }: UserContextProviderProps) {
  const router = useRouter();

  const [user, setUser] = React.useState<User | null>(null);

  const [loading, setLoading] = React.useState(true);

  const {
    loading: loadingUser,
    data: dataUser,
    error: errorUser,
  } = useQuery<{
    currentUser: User;
  }>(CURRENT_USER);

  React.useEffect(() => {
    if (!loadingUser) {
      if (dataUser?.currentUser) {
        setUser(dataUser.currentUser);
      } else if (errorUser || !dataUser?.currentUser) {
        setUser(null);
        router.push('/');
      }
      setLoading(false);
    }
  }, [dataUser, errorUser, loadingUser]);

  const context = React.useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <UserContext.Provider value={context}>
      {loading ? <p>Loading...</p> : children}
    </UserContext.Provider>
  );
}
