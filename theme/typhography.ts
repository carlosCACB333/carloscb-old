import { PaletteOptions } from '@mui/material';
import { TypographyOptions } from '@mui/material/styles/createTypography';

export const themeTypography = (options: PaletteOptions): TypographyOptions => {
  return {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',

    h1: {
      fontWeight: 900,
      color: options.text?.primary,
      fontSize: '3rem',
      letterSpacing: 0,
    },

    h2: {
      fontWeight: 800,
      color: options.text?.primary,
      fontSize: '2.65rem',
      letterSpacing: 0,
    },

    h3: {
      fontWeight: 700,
      color: options.text?.primary,
      fontSize: '2.3rem',
      letterSpacing: 0,
    },

    h4: {
      fontWeight: 700,
      color: options.text?.primary,
      fontSize: '1.95rem',
      letterSpacing: 0,
    },

    h5: {
      fontWeight: 600,
      color: options.text?.primary,
      fontSize: '1.6rem',
      letterSpacing: 0,
    },

    h6: {
      fontWeight: 600,
      color: options.text?.primary,
      fontSize: '1.25rem',
      letterSpacing: 0,
    },

    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      color: options.text?.primary,
      letterSpacing: 0,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: options.text?.primary,
      letterSpacing: 0,
    },

    body1: {
      fontSize: '1rem',
      fontWeight: 300,
      color: options.text?.secondary,
      letterSpacing: 0,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 300,
      color: options.text?.secondary,
      letterSpacing: 0,
    },

    caption: {
      fontSize: '0.75rem',
      fontWeight: 300,
      color: options.text?.secondary,
      letterSpacing: 0,
    },

    overline: {
      fontSize: '0.75rem',
      fontWeight: 400,
      color: options.text?.primary,
      letterSpacing: 0,
      textTransform: 'uppercase',
    },

    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: options.text?.primary,
      letterSpacing: 0,
      textTransform: 'capitalize',
    },
  };
};
