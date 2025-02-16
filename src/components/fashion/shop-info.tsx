import CloseIcon from "@mui/icons-material/Close";
import DirectionsIcon from "@mui/icons-material/Directions";
import {
  Box,
  Fab,
  List,
  ListItem,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  SwipeableDrawer,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { type Shop } from "./data";

interface ShopInfoProps {
  shop?: Shop;
  onClose: () => void;
}
export const ShopInfo = ({ shop, onClose }: ShopInfoProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const noop = () => {};
  return (
    <SwipeableDrawer
      open={!!shop}
      onClose={onClose}
      onOpen={noop}
      anchor={isMobile ? "bottom" : "right"}
      PaperProps={{
        sx: {
          background: theme.palette.primary.main,
          [theme.breakpoints.up("md")]: {
            minWidth: 600,
          },
        },
      }}
    >
      <List sx={{ paddingTop: 0 }}>
        {shop?.picture && (
          <ListItem
            sx={{ display: "flex", justifyContent: "center" }}
            disablePadding
          >
            <Box
              component="img"
              src={shop.picture}
              alt={shop.name}
              sx={{
                width: "100%",
                height: 200,
                objectFit: "cover",
              }}
            ></Box>
            <Fab
              color="primary"
              size="medium"
              aria-label="close"
              sx={{
                position: "absolute",
                top: theme.spacing(2),
                right: theme.spacing(2),
                opacity: 0.8,
              }}
              onClick={onClose}
            >
              <CloseIcon />
            </Fab>
          </ListItem>
        )}
        <ListItem>
          <ListItemText>
            <Typography variant="h3" color="secondary">
              {shop?.name}
            </Typography>
          </ListItemText>
        </ListItem>
        {shop?.address && (
          <ListItemButton
            onClick={() => {
              window.open(
                `http://maps.google.com/?q=${shop.address}`,
                "_blank"
              );
            }}
          >
            <ListItemText primaryTypographyProps={{ color: "secondary" }}>
              {shop.address}
            </ListItemText>
            <ListItemSecondaryAction>
              <DirectionsIcon color="secondary" />
            </ListItemSecondaryAction>
          </ListItemButton>
        )}
      </List>
    </SwipeableDrawer>
  );
};
