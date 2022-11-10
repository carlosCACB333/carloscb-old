import { TypographyOptions } from '@mui/material/styles/createTypography';
import { PaletteOptions } from '@mui/material';

export const themeTypography = (options: PaletteOptions): TypographyOptions => {
  return {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    overline: {
      color: options.text?.primary,
    },
    h6: {
      fontWeight: 500,
      color: options.text?.secondary,
      fontSize: '0.75rem',
    },
    h5: {
      fontSize: '0.875rem',
      color: options.text?.secondary,
      fontWeight: 500,
    },
    h4: {
      fontSize: '1rem',
      color: options.text?.secondary,
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.25rem',
      color: options.text?.primary,
      fontWeight: 600,
    },
    h2: {
      fontSize: '1.5rem',
      color: options.text?.primary,
      fontWeight: 700,
    },
    h1: {
      fontSize: '2.125rem',
      color: options.text?.primary,
      fontWeight: 700,
    },
    subtitle1: {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: options.text?.primary,
    },
    subtitle2: {
      fontSize: '0.75rem',
      fontWeight: 400,
      color: options.text?.secondary,
    },
    caption: {
      fontSize: '0.75rem',
      color: options.text?.secondary,
      fontWeight: 400,
    },
    body1: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: '1.334em',
      color: options.text?.primary,
    },
    body2: {
      letterSpacing: '0em',
      fontWeight: 400,
      lineHeight: '1.5em',
      color: options.text?.secondary,
    },
    button: {
      textTransform: 'capitalize',
      color: options.text?.primary,
    },
  };
};
