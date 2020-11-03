import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function useUser() {
  const { user, setUser } = useContext(AuthContext);
  return [user, setUser] as const;
}
