import { IconButton, Link, makeStyles, Typography, useMediaQuery } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
import { SpeedDialIcon } from "@material-ui/lab";
import { navigate } from "raviger";
import React, { useState, useEffect } from "react";
import theme from "../style/theme";
import MenuComponent from "./menu";
import SocialComponent from "./social";

const useStyles = makeStyles({
  root: {
    display: "flex",
    height: "100vh",
  },
  left: {
    // transition: "flex 0.3s ease-out",
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
  social: {
    display: "flex",
    justifyContent: "center",
  },
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

interface IProps {
  title: string;
  path: string;
  description: string;
  backButton?: boolean;
}
const Main: React.FC<IProps> = ({ title, path, description, backButton, children }) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:800px)");
  const [isMenuOpen, updateIsMenuOpen] = useState(false);

  useEffect(() => {
    const canonicalElement = document.querySelector('head link[rel="canonical"]');
    const descriptionElement = document.querySelector('head meta[name="description"]');

    document.title = `${title} - Hugo Carnicelli`;
    if (canonicalElement) {
      canonicalElement.setAttribute("href", `https://hugocarnicelli.com/${path}`);
    }
    if (descriptionElement) {
      descriptionElement.setAttribute("content", description);
    }
  }, [title, path, description]);

  return (
    <div className={`${classes.root} ${!isDesktop && !backButton ? classes.mobile : ""}`}>
      {backButton ? (
        <header className={classes.backBar}>
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
        </header>
      ) : isDesktop ? (
        <header className={classes.left}>
          <div className={classes.inset}>
            <Typography variant="subtitle1">Hello, I'm</Typography>
            <Typography variant="h1">
              Hugo <b>Carnicelli</b>
            </Typography>
            <Typography variant="subtitle1">Fullstack Developer</Typography>
            <MenuComponent />
            <SocialComponent display={backButton ? "block" : "flex"} />
          </div>
        </header>
      ) : (
        <header className={`${classes.left} ${isMenuOpen ? classes.fullHeight : ""}`}>
          <div className={classes.header}>
            <Typography variant="h1">Hello, I'm Hugo Carnicelli</Typography>
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
        </header>
      )}
      <div className={classes.right}>
        <div className={classes.inset}>{children}</div>
      </div>
    </div>
  );
};

export default Main;
