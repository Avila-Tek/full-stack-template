import React from 'react';

const getInitialTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    // first, we check if a stored preference exists
    const storedPrefs = window.localStorage.getItem('color-theme');
    if (typeof storedPrefs === 'string') {
      return storedPrefs as 'auto' | 'dark' | 'light';
    }

    // otherwise, this will follow os preferences
    const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
    if (userMedia.matches) {
      return 'auto';
      // return 'dark';
    }
  }

  // this will be the default theme
  return 'auto';
};

interface ThemeContextProps {
  theme?: 'auto' | 'dark' | 'light';
  setTheme?: React.Dispatch<React.SetStateAction<'auto' | 'dark' | 'light'>>;
}

export const ThemeContext = React.createContext<ThemeContextProps>({
  theme: 'auto',
});

interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: 'auto' | 'dark' | 'light';
}

export function ThemeContextProvider({
  initialTheme,
  children,
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<'auto' | 'dark' | 'light'>(
    getInitialTheme()
  );

  const rawSetTheme = (_theme: 'auto' | 'dark' | 'light') => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;

      if (_theme === 'auto') {
        const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
        localStorage.removeItem('color-theme');

        if (userMedia.matches) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      } else {
        root.classList.remove(_theme === 'dark' ? 'light' : 'dark');
        root.classList.add(_theme);
        localStorage.setItem('color-theme', _theme);
      }
    }
  };

  React.useEffect(() => {
    if (initialTheme) {
      rawSetTheme(initialTheme);
    }
  }, []);

  React.useEffect(() => {
    // Each time the user change the SO scheme preference, we have to listen to it
    const changeSOPreference = () => {
      rawSetTheme('auto');
    };

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', changeSOPreference);
  }, []);

  React.useEffect(() => {
    rawSetTheme(theme);
  }, [theme]);

  const value = React.useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
