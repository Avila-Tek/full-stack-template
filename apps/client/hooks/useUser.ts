import { useContext } from 'react';
import { UserContext } from '../context';

export function useUser() {
  const { user, setUser } = useContext(UserContext);
  return [user, setUser] as const;
}
