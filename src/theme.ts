import { ThemeOptions, createTheme } from "@mui/material";
import { NAVBAR_HEIGHT } from "./constants";

const baseTheme = createTheme();

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
      [baseTheme.breakpoints.down("md")]: {
        fontSize: "3em",
      },
    },
    h2: {
      [baseTheme.breakpoints.down("sm")]: {
        fontSize: "2em",
      },
    },
    h3: {
      [baseTheme.breakpoints.down("sm")]: {
        fontSize: "1.5em",
      },
    },
    h4: {
      [baseTheme.breakpoints.down("sm")]: {
        fontSize: "1.5em",
      },
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
    },
    MuiTabs: {
      styleOverrides: {
        root: { height: NAVBAR_HEIGHT },
        flexContainer: { height: "100%" },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textTransform: "none",
          height: "100%",
          color: palette.primary.contrastText,
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 4,
            backgroundColor: palette.secondary.light,
            transform: "scaleX(0) translateY(4px)",
            transition: "transform 0.2s ease-in-out",
            borderRadius: "2px 2px 0 0",
            zIndex: 1,
          },
          "&.Mui-selected": {
            color: palette.primary.contrastText,
            "&::after": {
              transform: "scaleX(1) translateY(0)",
            },
          },
        },
      },
    },
  },
} as ThemeOptions);
