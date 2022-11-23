import { Components, PaletteOptions, Theme } from '@mui/material';

export const themeComponents = (options: PaletteOptions): Components<Omit<Theme, 'components'>> => {
  return {
    MuiAppBar: { defaultProps: { elevation: 0 }, styleOverrides: { root: { backgroundColor: 'transparent' } } },
    MuiDrawer: { defaultProps: { elevation: 0 }, styleOverrides: { root: {} } },

    MuiButton: { defaultProps: { variant: 'contained' } },
    MuiAccordion: {
      defaultProps: { elevation: 0 },
      styleOverrides: { root: { backgroundColor: 'transparent', ':before': { content: 'none' } } },
    },
    MuiAccordionSummary: { styleOverrides: { root: { padding: 0 } } },

    MuiListItem: { styleOverrides: { root: { padding: 0 } } },
    MuiListItemIcon: { styleOverrides: { root: { minWidth: 'auto', marginRight: 8, color: 'inherit' } } },
    MuiLink: {
      styleOverrides: {
        root: {
          width: '100%',
          textDecoration: 'none',
          cursor: 'pointer',
          color: options.text?.secondary,
          ':hover': { color: options.text?.primary, fontWeight: 'bold' },
        },
      },
    },

    MuiCard: {
      defaultProps: { elevation: 0 },
    },
  };
};
