import { PaletteOptions } from '@mui/material';
import { IMode } from './theme';

export const themePalette = (mode: IMode): PaletteOptions => {
  const isDark = mode === 'dark';
  return {
    mode,
    common: {
      black: isDark ? '#1e1e2e' : '#fafcff',
      white: isDark ? '#fafcff' : '#1e1e2e',
    },

    primary: {
      light: isDark ? '#e3f2fd' : '#e3f2fd',
      200: isDark ? '#bbdefb' : '#bbdefb',
      main: isDark ? '#588aef' : 'rgb(72 132 229)',
      dark: isDark ? '#5c8efb' : '#1976d2',
      800: isDark ? '#3a5af2' : '#0d47a1',
    },
    secondary: {
      light: isDark ? '#d1c4e9' : '#ede7f6',
      main: isDark ? '#7582eb' : '#323c8f',
      dark: isDark ? '#651fff' : '#5e35b1',
      200: isDark ? '#b39ddb' : '#b39ddb',
      800: isDark ? '#6200ea' : '#4527a0',
    },
    error: {
      light: '#ef9a9a',
      main: '#f44336',
      dark: '#c62828',
    },

    warning: {
      light: '#fff8e1',
      main: isDark ? '#201e15' : '#ffe57f',
      dark: isDark ? '#382e00' : '#ffca28',
    },
    success: {
      light: '#b9f6ca',
      200: '#69f0ae',
      main: '#10b981',
      dark: '#00c853',
    },
    grey: {
      50: '#cdd6f4',
      200: '#bcc7e8',
      500: '#9aa8d6',
      700: '#7a88c3',
      900: '#5a69b1',
    },
    text: {
      primary: isDark ? '#d4ddfb' : 'rgb(18, 24, 40)',
      secondary: isDark ? '#bdc8f0' : '#404152',
      disabled: isDark ? '#8492c4' : '#616161',
    },
    background: {
      paper: isDark ? 'rgb(15 18 26)' : 'rgb(247,247,252)',
      default: isDark ? '#07090e' : '#fafcff',
    },
  };
};
