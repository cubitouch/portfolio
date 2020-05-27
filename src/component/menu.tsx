import { Link, List, ListItem, ListItemText, makeStyles } from "@material-ui/core";
import { navigate, usePath } from "raviger";
import React from "react";

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
    },
    "& .MuiSvgIcon-root": {
      fill: "white",
    },
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
      <Item route="/guid" text="GUID" />
      <Item route="/json" text="JSON" />
      <Item route="/relax" text="Relax" />
      {/* <ListItem button>About</ListItem> */}
    </List>
  );
};

export default MenuComponent;
