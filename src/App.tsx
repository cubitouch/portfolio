import {
  IconButton,
  Link,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import CloseIcon from "@material-ui/icons/Close";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import MenuIcon from "@material-ui/icons/Menu";
import { SpeedDialIcon } from "@material-ui/lab";
import { navigate, usePath, useRoutes } from "raviger";
import React, { useEffect, useState } from "react";
import ReactGA from "react-ga";
import "./App.css";
import theme from "./style/theme";
import ExperienceView from "./view/experience-view";
import GuidView from "./view/guid-view";
import JsonView from "./view/json-view";
import RelaxView from "./view/relax-view";

const useStyles = makeStyles({
  root: {
    display: "flex",
    height: "100vh",
  },
  centeredList: {
    "&.MuiList-root": {
      padding: "32px 0",
      flex: "1",
      justifyContent: "center",
      display: "flex",
      flexDirection: "column",
      "& .MuiListItem-root": {
        justifyContent: "flex-end",
      },
    },
    "& .MuiSvgIcon-root": {
      fill: "white",
    },
  },
  left: {
    transition: "flex 0.3s ease-out",
    backgroundColor: theme.palette.primary.main,
    color: "white",
    flex: "2",
    display: "flex",
    justifyContent: "flex-end",
    "& .MuiTypography-h1": {
      fontSize: "3rem",
      fontVariant: "small-caps",
      textAlign: "center",
      marginBottom: 8,
    },
    "& .MuiTypography-subtitle1": {
      textAlign: "center",
      display: "block",
    },

    "& .MuiIconButton-root": {
      color: "white",
    },
  },
  inset: {
    padding: "64px 32px",
    display: "flex",
    flexDirection: "column",
  },
  right: {
    display: "flex",
    "& $inset": {
      flex: "1",
    },
    "&::-webkit-scrollbar": {
      width: "11px",
    },
    "&::-webkit-scrollbar-track": {
      width: "11px",
      background: theme.palette.grey[200],
    },
    "&::-webkit-scrollbar-thumb": {
      width: "11px",
      border: `1px solid ${theme.palette.grey[200]}`,
      background: theme.palette.primary.dark,
      borderRadius: 6,
    },
    overflow: "auto",
    flex: "3",
    "& .MuiStepLabel-labelContainer": {
      marginLeft: 8,
    },
    "& .MuiStepper-root": {
      padding: "32px 0",
    },
    "& .MuiStepContent-root": {
      marginLeft: 20,
      borderLeft: "1px solid #bdbdbd",
    },
    "& .MuiStepConnector-root": {
      marginLeft: 20,
      "& .MuiStepConnector-line": {
        borderLeft: "1px solid #bdbdbd",
      },
    },
    "& .MuiTypography-h2": {
      fontFamily: "'Titillium Web', sans-serif",
      fontSize: "2rem",
      color: theme.palette.grey[800],
    },
    "& .MuiTypography-h3": {
      fontFamily: "'Titillium Web', sans-serif",
      fontSize: "1.6rem",
      color: theme.palette.secondary.main,
    },
    "& .MuiList-root": {
      paddingBottom: 16,
    },
    "& .MuiListSubheader-root": {
      color: theme.palette.grey[800],
      backgroundColor: "white",
      lineHeight: "inherit",
      padding: "16px",
    },
    "& .MuiListItem-root": {
      color: "rgba(0, 0, 0, 0.54)",
      "&.MuiListItem-dense": {
        "& .MuiTypography-body2": {
          fontSize: "0.8rem",
        },
        paddingTop: 0,
        paddingBottom: 0,
      },
      "& .MuiListItemAvatar-root": {
        minWidth: 24,
        alignItems: "center",
        display: "flex",
        "& .MuiSvgIcon-root": { fontSize: "1rem" },
      },
    },
    "& .MuiChip-root": {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
  headTime: {
    fontWeight: 700,
    fontFamily: "'Titillium Web', sans-serif",
    color: theme.palette.secondary.light,
    letterSpacing: 0.5,
    lineHeight: "16px",
  },
  headTitle: {
    fontWeight: 700,
    fontFamily: "'Titillium Web', sans-serif",
    color: theme.palette.primary.dark,
    letterSpacing: 2,
    lineHeight: "24px",
  },
  headSubtitle: {
    color: theme.palette.grey[700],
    lineHeight: "16px",
  },
  social: {
    display: "flex",
    justifyContent: "center",
  },
  techs: { marginLeft: 16 },
  menuContent: {
    display: "flex",
    flexDirection: "column",
    height: "calc(100% - 48px)",
    opacity: 0,
    transition: "opacity 0.4s",
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

const MenuComponent: React.FC = () => {
  const classes = useStyles();
  const path = usePath();

  const Item = ({ route, text }: { route: string; text: string }) => (
    <ListItem button selected={path === route || path === `${route}/`} onClick={() => navigate(route)}>
      <ListItemText>
        <Link
          href={route}
          color="inherit"
          underline="none"
          onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => e.preventDefault()}
        >
          {text}
        </Link>
      </ListItemText>
    </ListItem>
  );
  return (
    <List className={classes.centeredList}>
      <Item route="/" text="Experience" />
      <Item route="/guid" text="GUID generator" />
      <Item route="/json" text="JSON Parser" />
      <Item route="/relax" text="Relax" />
      {/* <ListItem button>About</ListItem> */}
    </List>
  );
};

interface ISocialProps {
  display?: string;
}
const SocialComponent: React.FC<ISocialProps> = ({ display }) => {
  const classes = useStyles();
  return (
    <div className={classes.social} style={{ display: display || "flex" }}>
      <IconButton href="https://github.com/cubitouch" target="_blank">
        <GitHubIcon />
      </IconButton>
      <IconButton href="https://www.linkedin.com/in/hugo-carnicelli/?locale=en_US" target="_blank">
        <LinkedInIcon />
      </IconButton>
    </div>
  );
};

const App: React.FC = () => {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:800px)");
  const [isMenuOpen, updateIsMenuOpen] = useState(false);

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
      <div className={`${classes.root} ${!isDesktop && !withoutMenu ? classes.mobile : ""}`}>
        {withoutMenu ? (
          <div className={classes.backBar}>
            <Link
              href="/"
              onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                navigate("/");
                e.preventDefault();
              }}
            >
              <IconButton aria-label="delete">
                <ChevronLeftIcon fontSize="small" />
              </IconButton>
            </Link>
          </div>
        ) : isDesktop ? (
          <div className={classes.left}>
            <div className={classes.inset}>
              <Typography variant="subtitle1">Hello, I'm</Typography>
              <Typography variant="h1">
                Hugo <b>CARNICELLI</b>
              </Typography>
              <Typography variant="subtitle1">Fullstack Developer</Typography>
              <MenuComponent />
              <SocialComponent display={path.startsWith("/json") ? "block" : "flex"} />
            </div>
          </div>
        ) : (
          <div className={`${classes.left} ${isMenuOpen ? classes.fullHeight : ""}`}>
            <div className={classes.header}>
              <Typography variant="h1">Hello, I'm Hugo CARNICELLI</Typography>
              <SpeedDialIcon
                icon={<MenuIcon />}
                openIcon={<CloseIcon />}
                open={isMenuOpen}
                onClick={() => updateIsMenuOpen(!isMenuOpen)}
              />
            </div>
            <div className={classes.menuContent}>
              <Typography variant="h2">Fullstack Developer</Typography>
              <MenuComponent />
              <SocialComponent />
            </div>
          </div>
        )}
        <div className={classes.right}>
          <div className={classes.inset}>{<Router />}</div>
        </div>
      </div>
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
