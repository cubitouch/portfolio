import { faCog, faPercentage, faStream, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText, makeStyles
} from "@material-ui/core";
import { navigate } from "raviger";
import React from "react";
import Main from "../component/main";
import theme from "../style/theme";

const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

const Item: React.FC<{ route: string; icon: IconDefinition; label: string }> =
  ({ route, icon, label }) => {
    return (
      <ListItem button onClick={() => navigate(route)}>
        <ListItemIcon>
          <FontAwesomeIcon icon={icon} />
        </ListItemIcon>
        <ListItemText primary={label} />
      </ListItem>
    );
  };

const ToolsView: React.FC = () => {
  const classes = useStyles();
  return (
    <Main title="Tools" path="tools" description="Random list of tools">
      <div className={classes.root}>
        <List component="nav">
          <Item route="/json" icon={faStream} label="JSON" />
          <Item route="/guid" icon={faCog} label="GUID generator" />
          <Item route="/encoders" icon={faPercentage} label="Base64" />
        </List>
      </div>
    </Main>
  );
};

export default ToolsView;
