import { Components, PaletteOptions, Theme } from "@mui/material";

export const themeComponents = (
  options: PaletteOptions
): Components<Omit<Theme, "components">> => {
  return {
    MuiAppBar: {
      defaultProps: { elevation: 0 },
      styleOverrides: { root: { backgroundColor: "transparent" } },
    },
    MuiDrawer: { defaultProps: { elevation: 0 }, styleOverrides: { root: {} } },

    MuiButton: { defaultProps: { variant: "contained" } },
    MuiAccordion: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          margin: "0 !important",
          ":before": { content: "none" },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: "0 !important",
          margin: 0,
          minHeight: 30,
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: "0 !important",
          margin: 0,
        },
      },
    },

    MuiList: { styleOverrides: { dense: true, root: { fontSize: "initial" } } },
    MuiListItem: { styleOverrides: { root: { padding: 0 } } },
    MuiListItemIcon: {
      styleOverrides: {
        root: { minWidth: "auto", marginRight: 8, color: "inherit" },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
          cursor: "pointer",
          color: (options.primary as any)?.main,
          lineHeight: 0,
          ":hover": {
            textDecoration: "underline",
          },
        },
      },
    },

    MuiCard: {
      defaultProps: { elevation: 0 },
    },
  };
};
