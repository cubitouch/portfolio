import { makeStyles, ThemeProvider, Typography } from "@material-ui/core";
import { usePath, useRoutes } from "raviger";
import React, { useEffect, useState } from "react";
import ReactGA from "react-ga";
import "./App.css";
import theme from "./style/theme";
import ExperienceView from "./view/experience-view";
import GuidView from "./view/guid-view";
import JsonView from "./view/json-view";
import RelaxView from "./view/relax-view";

const useStyles = makeStyles({
  root: {},
  social: {
    display: "flex",
    justifyContent: "center",
  },

  fullHeight: {
    "& $menuContent": {
      opacity: 1,
    },
  },
  mobile: {
    flexDirection: "column",
    "& $left": {
      flexDirection: "column",
      height: 24,
      transition: "height 0.2s ease-out",
      padding: 15,
      flex: "inherit",

      justifyContent: "left",

      "& .MuiTypography-h1": {
        lineHeight: "24px",
        textAlign: "left",
        flex: "1",
        fontSize: "1rem",
        marginBottom: 0,
      },
      "& .MuiTypography-h2": {
        fontSize: "1.2rem",
      },
      "&$fullHeight": {
        height: "calc(var(--vh, 1vh) * 100)",
        alignItems: "inherit",
        paddingBottom: 0,
      },
    },
    "& $inset": { padding: "32px 16px" },
  },
  header: {
    display: "flex",
  },
  backBar: {
    width: 48,
    height: "100vh",
    display: "flex",
    background: theme.palette.primary.main,
    "& .MuiIconButton-root": { color: "white" },
    "& .MuiLink-root": { display: "flex" },
  },
});

const App: React.FC = () => {
  const classes = useStyles();

  const [hasGAInitialized, updateHasGAInitialized] = useState(false);
  const path = usePath();
  const [currentPath, updateCurrentPath] = useState("");
  if (!hasGAInitialized) {
    ReactGA.initialize("UA-166014611-1");
    updateHasGAInitialized(true);
  }
  useEffect(() => {
    // trigger GA if path as changed
    if (hasGAInitialized && currentPath !== path) {
      ReactGA.pageview(path);
      updateCurrentPath(path);
    }
  });

  const withoutMenu = path.startsWith("/json") || path.startsWith("/relax");

  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  );
};

const Router = () => {
  const routeResult = useRoutes(
    {
      "": () => <ExperienceView />,
      // '/about': () => <AboutView />,
      "/guid": () => <GuidView />,
      "/json": () => <JsonView />,
      "/relax": () => <RelaxView />,
    },
    { matchTrailingSlash: true }
  );
  return routeResult || <Typography variant="h2">&#129300; Oops, I can't find what you are looking for...</Typography>;
};

export default App;
