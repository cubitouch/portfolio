import {
  AppBar,
  Box,
  Stack,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";

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
