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
    },
    MuiTabs: {
      styleOverrides: {
        root: { height: 64 },
        flexContainer: { height: "100%" },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
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
