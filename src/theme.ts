import { ThemeOptions, createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#384259",
      contrastText: "#c4edde",
    },
    secondary: {
      main: "#c4edde",
      contrastText: "#384259",
    },
  },
  typography: {
    h1: {
      fontFamily: "'Titillium Web', sans-serif",
      letterSpacing: "0.05em",
    },
    h2: {
      textTransform: "uppercase",
      fontWeight: 700,
      letterSpacing: "0.1em",
      fontFamily: "'Montserrat', sans-serif",
    },
    h3: {
      fontFamily: "'Montserrat', sans-serif",
    },
    h4: {
      fontFamily: "'Montserrat', sans-serif",
    },
    h5: {
      fontFamily: "'Montserrat', sans-serif",
    },
    h6: {
      fontFamily: "'Montserrat', sans-serif",
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
