import {
  AppBar,
  Box,
  Fab,
  Stack,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";

import React from "react";
import { useNavigate } from "react-router";
import Logo from "../assets/logo.svg?react";

interface NavBarProps {
  currentSection: string;
  scrollTo: (id: string) => void;
  defaultSectionId: string;
}
export const NavBar = ({
  currentSection,
  scrollTo,
  defaultSectionId,
}: NavBarProps) => {
  return (
    <AppBar>
      <Toolbar>
        <Stack spacing={1} direction="row" alignItems="center" flex="1">
          <Typography
            variant="h6"
            component="div"
            sx={{ display: { xs: "none", md: "inherit" } }}
          >
            Hi, I'm
          </Typography>
          <Logo fontSize={32} />
          <Box flex="1"></Box>
          <Tabs value={currentSection}>
            {["", "Journey", "Interests", "More"].map((tab) => {
              const id = tab.toLowerCase();
              const value = !!id ? id : defaultSectionId;
              return (
                <Tab
                  sx={!id ? { width: 0, minWidth: 0, padding: 0 } : undefined}
                  value={value}
                  key={value}
                  label={tab}
                  data-to-scrollspy-id={value}
                  onClick={() => scrollTo(id)}
                />
              );
            })}
          </Tabs>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

interface SimpleNavBarProps {
  actions?: { onClick: () => void; icon: React.ReactNode }[];
}
export const SimpleNavBar = ({ actions }: SimpleNavBarProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <>
      <AppBar sx={{ height: 64 }}>
        <Toolbar>
          <Box
            onClick={() => navigate("/")}
            display="flex"
            gap={1}
            sx={{ cursor: "pointer" }}
          >
            <Logo fontSize={32} />
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          position: "fixed",
          bottom: theme.spacing(4),
          right: theme.spacing(4),
          display: "flex",
          flexDirection: "row",
          gap: theme.spacing(2),
          zIndex: 1,
        }}
      >
        {actions?.map((action, i) => (
          <Fab key={i} onClick={action.onClick}>
            {action.icon}
          </Fab>
        ))}
      </Box>
    </>
  );
};
