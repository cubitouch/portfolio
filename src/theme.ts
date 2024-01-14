import { ThemeOptions, createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
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
  },
  typography: {
    allVariants: {
      fontFamily: "'Montserrat', sans-serif",
    },
    h1: {
      fontFamily: "'Titillium Web', sans-serif",
      letterSpacing: "0.05em",
    },
    h2: {
      fontFamily: "'Titillium Web', sans-serif",
      letterSpacing: "0.05em",
    },
  },
  components: {
    MuiPaper: {
      defaultProps: {
        square: true,
        elevation: 0,
      },
    },
  },
} as ThemeOptions);
