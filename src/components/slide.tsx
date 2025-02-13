import {
  Box,
  Container,
  Paper,
  Stack,
  Typography,
  useTheme,
  type Breakpoint,
} from "@mui/material";
import { NAVBAR_HEIGHT } from "../constants";

interface SlideProps {
  children: React.ReactNode;
  light?: boolean;
  dark?: boolean;
  primary?: string;
  background?: string;
  id?: string;
  hint?: React.ReactNode;
  first?: boolean;
  maxWidth?: Breakpoint | false;
}
export const Slide = ({
  children,
  light,
  dark,
  primary,
  background,
  id,
  hint,
  first,
  maxWidth = false,
}: SlideProps) => {
  const theme = useTheme();

  const getSizings = (spacing: number) => ({
    paddingTop: first
      ? `calc(${NAVBAR_HEIGHT}px + ${theme.spacing(spacing)})`
      : theme.spacing(spacing),
    paddingBottom: hint ? 0 : theme.spacing(spacing),
    minHeight: `calc(100dvh - ${
      background ? 0 : NAVBAR_HEIGHT
    }px - ${theme.spacing(hint ? spacing : spacing * 2)})`,
  });

  return (
    <Paper
      id={id}
      sx={{
        display: "flex",
        ...getSizings(8),
        [theme.breakpoints.down("sm")]: {
          ...getSizings(4),
        },
        background: background
          ? "none"
          : light
          ? theme.palette.secondary.main
          : dark
          ? theme.palette.primary.main
          : "inherit",
        color: light
          ? theme.palette.secondary.contrastText
          : dark
          ? theme.palette.primary.contrastText
          : theme.palette.primary.dark,
        position: "relative",
        overflow: "hidden",
        zIndex: 0,
        "&::before": background
          ? {
              zIndex: -1,
              content: "''",
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              background: `url(${background}) no-repeat center center / cover`,
            }
          : undefined,
      }}
    >
      <Container maxWidth={maxWidth} sx={{ flex: 1, display: "flex" }}>
        <Stack spacing={hint ? 0 : 4} flex="1">
          {primary && (
            <Typography
              variant="h2"
              display="flex"
              alignItems="center"
              sx={{ "& svg": { marginRight: theme.spacing(1) } }}
            >
              {primary}
            </Typography>
          )}
          {children}
          {hint && (
            <Box display="flex" justifyContent="center">
              {hint}
            </Box>
          )}
        </Stack>
      </Container>
    </Paper>
  );
};
