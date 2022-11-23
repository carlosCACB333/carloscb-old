import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as ThemeProv } from '@mui/material/styles';
import { createContext, FC, PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { getTheme } from '../theme';
type Mode = 'light' | 'dark';

interface ThemeContextProps {
  mode: Mode;
  toggleMode: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = useState<Mode>('dark');

  useEffect(() => {
    const mode = localStorage.getItem('theme');
    if (mode) {
      setMode(mode as Mode);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-color-mode', mode);
  }, [mode]);

  const toggleMode = () => {
    const m = mode === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', m);
    setMode(m);
  };

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProv theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProv>
    </ThemeContext.Provider>
  );
};
