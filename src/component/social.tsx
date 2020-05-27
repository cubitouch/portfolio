import { IconButton, makeStyles } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import React from "react";

const useStyles = makeStyles({
  root: {},
  social: {
    display: "flex",
    justifyContent: "center",
  },
});

interface IProps {
  display?: string;
}
const SocialComponent: React.FC<IProps> = ({ display }) => {
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

export default SocialComponent;
