import { PaletteOptions } from "@mui/material";
import { IMode } from "./theme";

export const themePalette = (mode: IMode): PaletteOptions => {
  const isDark = mode === "dark";
  return {
    mode,
    common: {
      black: isDark ? "#1e1e2e" : "#fafcff",
      white: isDark ? "#fafcff" : "#1e1e2e",
    },

    primary: {
      light: isDark ? "#e3f2fd" : "#e3f2fd",
      200: isDark ? "#bbdefb" : "#bbdefb",
      main: isDark ? "#588aef" : "#367BF4",
      dark: isDark ? "#5c8efb" : "#1976d2",
      800: isDark ? "#3a5af2" : "#0d47a1",
    },
    secondary: {
      light: isDark ? "#d1c4e9" : "#8c7ca7",
      main: isDark ? "#6a72ad" : "#53657e",
      dark: isDark ? "#5e5e9a" : "#4a3f5c",
      200: isDark ? "#9c9be7" : "#b3a7c9",
      800: isDark ? "#4527a0" : "#2e1a4d",
    },
    error: {
      light: "#ef9a9a",
      main: "#f44336",
      dark: "#c62828",
    },

    warning: {
      light: "#fff8e1",
      main: isDark ? "#201e15" : "#ffe57f",
      dark: isDark ? "#382e00" : "#ffca28",
    },
    success: {
      light: "#b9f6ca",
      200: "#69f0ae",
      main: "#10b981",
      dark: "#00c853",
    },
    grey: {
      50: "#cdd6f4",
      200: "#bcc7e8",
      500: "#9aa8d6",
      700: "#7a88c3",
      900: "#5a69b1",
    },
    text: {
      primary: isDark ? "#d4ddfb" : "#000001",
      secondary: isDark ? "#bdc8f0" : "#404152",
      disabled: isDark ? "#8492c4" : "#616161",
    },
    background: {
      paper: isDark ? "rgb(15 18 26)" : "#F2F8FF",
      default: isDark ? "#07090e" : "#EEF6FF",
    },
  };
};
