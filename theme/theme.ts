import { createTheme, responsiveFontSizes } from '@mui/material';
import { themeComponents } from './components';
import { themePalette } from './palette';
import { themeTypography } from './typhography';
export type IMode = 'light' | 'dark';

export const getTheme = (mode: IMode) => {
  const palette = themePalette(mode);

  const theme = createTheme({
    palette,
    typography: themeTypography(palette),
    components: themeComponents(palette),
    shape: {
      borderRadius: 8,
    },
  });

  return responsiveFontSizes(theme, {
    breakpoints: ['xs', 'sm', 'md', 'lg', 'xl'],
    factor: 5,
  });
};
