import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0E2F87",
      dark: "#081B47",
      light: "#80AEFF",
    },
    secondary: {
      main: "#C62626",
      dark: "#6D1616",
      light: "#E24444",
    },
  },
  typography: {
    fontFamily: "'Open Sans', sans-serif",
  },
  overrides: {
    MuiButtonBase: {
      root: {
        fontFamily: "'Titillium Web', sans-serif",
      },
    },
    MuiTypography: {
      h1: {
        fontFamily: "'Titillium Web', sans-serif",
      },
      h2: {
        fontFamily: "'Titillium Web', sans-serif",
      },
      h3: {
        fontFamily: "'Titillium Web', sans-serif",
      },
    },
  },
});

export default theme;
