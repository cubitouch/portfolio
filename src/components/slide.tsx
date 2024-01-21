import { Container, Paper, Stack, Typography, useTheme } from "@mui/material";

interface SlideProps {
  children: React.ReactNode;
  light?: boolean;
  dark?: boolean;
  primary?: string;
  background?: string;
  id?: string;
}
export const Slide = ({
  children,
  light,
  dark,
  primary,
  background,
  id,
}: SlideProps) => {
  const theme = useTheme();
  return (
    <Paper
      id={id}
      sx={{
        display: "flex",
        padding: theme.spacing(8, 0),
        minHeight: `calc(100dvh - ${background ? 0 : 64}px - ${theme.spacing(
          16
        )})`,
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
      <Container maxWidth={false} sx={{ flex: 1, display: "flex" }}>
        <Stack spacing={4} flex="1">
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
        </Stack>
      </Container>
    </Paper>
  );
};
