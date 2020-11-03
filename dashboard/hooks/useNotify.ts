import { useContext } from 'react';
import AppContext from '../context/AppContext';

export default function useNotify() {
  const { notify } = useContext(AppContext);
  return notify;
}
