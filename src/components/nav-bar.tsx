import {
  AppBar,
  Box,
  Stack,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import { NAVBAR_HEIGHT } from "~/constants";
import Logo from "../assets/logo.svg?react";

const useScrollSpy = (sectionIds: string[], offset = 0) => {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;
      const selected = sectionIds.find((id) => {
        const element = document.getElementById(id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          return (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          );
        }
        return false;
      });
      if (selected) {
        setActiveId(selected);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionIds, offset]);

  return activeId;
};

interface NavBarProps {
  scrollTo: (id: string) => void;
  defaultSectionId: string;
}
export const NavBar = ({ scrollTo, defaultSectionId }: NavBarProps) => {
  const tabs = ["", "Journey", "Interests", "More"];
  const sectionIds = tabs.map((t) =>
    (!!t ? t : defaultSectionId).toLowerCase()
  );
  const currentSection = useScrollSpy(sectionIds, NAVBAR_HEIGHT);

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
            {tabs.map((tab) => {
              const id = tab.toLowerCase();
              const value = !!id ? id : defaultSectionId;
              return (
                <Tab
                  LinkComponent="a"
                  href={`#${id}`}
                  sx={!id ? { width: 0, minWidth: 0, padding: 0 } : undefined}
                  value={value}
                  key={value}
                  label={tab}
                  onClick={(e) => {
                    scrollTo(id);
                    e.preventDefault();
                  }}
                />
              );
            })}
          </Tabs>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
