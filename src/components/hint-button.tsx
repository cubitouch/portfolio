import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, useTheme } from "@mui/material";

interface HintButtonProps {
  onClick: () => void;
}
export const HintButton = ({ onClick }: HintButtonProps) => {
  const theme = useTheme();
  return (
    <Button
      color="secondary"
      variant="contained"
      onClick={onClick}
      sx={{
        padding: theme.spacing(2, 6),
        marginTop: theme.spacing(4),
        [theme.breakpoints.down("md")]: {
            padding: theme.spacing(1, 3),
            marginTop: theme.spacing(2),
        },
        color: theme.palette.primary.main,
        background: theme.palette.common.white,
        borderRadius: theme.spacing(1, 1, 0, 0),
        opacity: 1,
        transition: "opacity 0.2s ease-in-out",
        "&:focus, &:hover, &:active": {
          color: theme.palette.primary.main,
          background: theme.palette.common.white,
          opacity: 0.8,
        },
      }}
    >
      <ExpandMoreIcon fontSize="large" />
    </Button>
  );
};
