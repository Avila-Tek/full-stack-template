import { useContext } from 'react';
import { ThemeContext } from '../context';

export function useTheme() {
  const { theme, setTheme } = useContext(ThemeContext);
  return [theme, setTheme] as const;
}
