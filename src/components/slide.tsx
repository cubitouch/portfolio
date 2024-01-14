/// <reference types="vite-plugin-svgr/client" />
import { Container, Paper, Stack, Typography, useTheme } from "@mui/material";
import Logo from "../assets/logo.svg?react";

interface SlideProps {
  children: React.ReactNode;
  light?: boolean;
  dark?: boolean;
  primary: string;
  logo?: boolean;
  background?: string;
}
export const Slide = ({
  children,
  light,
  dark,
  primary,
  logo,
  background,
}: SlideProps) => {
  const theme = useTheme();
  return (
    <Paper
      sx={{
        padding: theme.spacing(8, 0),
        minHeight: `calc(100dvh - ${theme.spacing(16)})`,
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
        "&::before": {
          zIndex: -1,
          content: "''",
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          background: `url(${background}) no-repeat center center / cover`,
        },
      }}
    >
      <Container>
        <Stack spacing={4}>
          <Typography
            variant="h2"
            display="flex"
            alignItems="center"
            sx={{ "& svg": { marginRight: theme.spacing(1) } }}
          >
            {logo && <Logo />}
            {primary}
          </Typography>
          {children}
        </Stack>
      </Container>
    </Paper>
  );
};
