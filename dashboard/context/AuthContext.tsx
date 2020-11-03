import React from 'react';
import { useQuery, useMutation, ApolloQueryResult } from '@apollo/client';
import { useRouter } from 'next/router';
import { SIGN_OUT, CURRENT_USER } from '../components/auth/graphql';
import { User } from '../models';

type TAuthContext = {
  user?: User;
  setUser?: React.Dispatch<React.SetStateAction<User>>;
  refetch?: (
    variables?: Partial<Record<string, any>>
  ) => Promise<
    ApolloQueryResult<{
      currentUser: User;
    }>
  >;
};

export const AuthContext = React.createContext<TAuthContext>({});

interface AuthProviderProps {
  children?: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [signOut] = useMutation(SIGN_OUT);
  const { data, loading, error, refetch } = useQuery<{ currentUser: User }>(
    CURRENT_USER
  );
  const [user, setUser] = React.useState<User>(null);
  React.useEffect(
    function syncUserWithState() {
      if (!loading && data) {
        console.log(data);
        setUser(data?.currentUser);
        // if (data && data.currentUser && data.currentUser.privilege >= 1) {
        //   setUser(data?.currentUser);
        // } else {
        //   signOut();
        //   if (router.asPath !== '/sign-in') {
        //     router.push('/sign-in');
        //   }
        // }
      }
    },
    [data, loading]
  );
  return (
    <AuthContext.Provider value={{ user, setUser, refetch }}>
      {loading ? <></> : children}
    </AuthContext.Provider>
  );
}
