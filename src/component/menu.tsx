import { Link, List, ListItem, ListItemText, makeStyles, ListItemIcon } from "@material-ui/core";
import { faGooglePlay, IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { navigate, usePath } from "raviger";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const useStyles = makeStyles({
  root: {},
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
      "& .MuiListItemIcon-root": {
        minWidth: "1rem",
        color: "White",
        "& svg": {
          width: 24,
          height: 24,
        },
      },
    },
    "& .MuiSvgIcon-root": {
      fill: "white",
    },
  },
});

const MenuComponent: React.FC = () => {
  const classes = useStyles();
  const path = usePath();

  const Item = ({ route, text, icon }: { route: string; text: string; icon?: IconDefinition }) => (
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
      {icon && (
        <ListItemIcon>
          <FontAwesomeIcon icon={icon} />
        </ListItemIcon>
      )}
    </ListItem>
  );
  return (
    <nav style={{ display: "flex", flex: "1" }}>
      <List className={classes.centeredList}>
        <Item route="/" text="Experience" />
        <Item route="/zenmerry" text="Zenmerry" icon={faGooglePlay} />
        <Item route="/json" text="JSON" />
        <Item route="/guid" text="GUID" />
        <Item route="/encoders" text="Base64 &amp; URL" />
        {/* <ListItem button>About</ListItem> */}
      </List>
    </nav>
  );
};

export default MenuComponent;
