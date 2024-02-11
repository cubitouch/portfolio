import { Box, CircularProgress, keyframes } from "@mui/material";
import Logo from "../assets/logo.svg?react";

const appearingLogo = keyframes`
    0% {
        clip-path: inset(0 87% 0 13%); /* Hidden, but centered */
        margin-left: 140px;
    }
    5% {
        clip-path: inset(0 82% 0 8%); /* Start with the dot */
    }
    15% {
        clip-path: inset(0 74% 0 0); /* Reveal up to the 'H' */
    }
    30% {
        clip-path: inset(0 74% 0 0); /* Stick to the 'H' */
        margin-left: 140px;
    }
    35% {
        clip-path: inset(0 0 0 0); /* Reveal the whole logo */
        margin-left: 0;
    }
    100% {
        clip-path: inset(0 0 0 0); /* Stick to that */
        margin-left: 0;
    }
`;
export const FancyLoader = () => {
  return (
    <Box
      sx={{
        fontSize: 100,
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          "& #logo": {
            animation: `${appearingLogo} 10s ease infinite`,
            transition: "all 0.5s ease",
            // clipPath: "inset(0 74% 0 0)",
            // marginLeft: "140px",
          },
        }}
      >
        <Logo id="logo" />
      </Box>
      {/* TODO: animate the spinner to appear when the logo is in full */}
      <CircularProgress
        color="inherit"
        size={260}
        thickness={1}
        sx={{ opacity: 0.8 }}
      />
    </Box>
  );
};
