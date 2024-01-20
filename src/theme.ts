import { ThemeOptions, createTheme } from "@mui/material";

const palette = {
  primary: {
    main: "#384259",
    dark: "#242b3a",
    light: "#4c5978",
    contrastText: "#ebf9f4",
  },
  secondary: {
    main: "#ebf9f4",
    dark: "#9de1c8",
    light: "#c4edde",
    contrastText: "#384259",
  },
};

export const lightTheme = createTheme({
  palette,
  typography: {
    allVariants: {
      fontFamily: "Titillium Web, sans-serif",
    },
    h1: {
      fontFamily: "'Paytone One', sans-serif",
      letterSpacing: "0.02em",
    },
  },
  components: {
    MuiPaper: {
      defaultProps: {
        square: true,
        elevation: 0,
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        position: "fixed",
      },
      styleOverrides: {
        root: {
          borderBottom: `solid 1px ${palette.primary.light}`,
        },
      },
    },
  },
} as ThemeOptions);
