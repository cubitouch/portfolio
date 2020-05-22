import { Button, makeStyles, Snackbar, Typography, Box } from "@material-ui/core";
import React, { useState } from "react";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import AutorenewIcon from "@material-ui/icons/Autorenew";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: "1",
    justifyContent: "center",
    "& h3": {
      marginBottom: 32,
      fontWeight: "700",
      letterSpacing: 4,
    },
    "& button": { margin: 8 },
  },
});

export const newGuid = () =>
  "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

const GuidView: React.FC = () => {
  const classes = useStyles();
  const [guid, updateGuid] = useState(newGuid());
  const [copied, updateCopied] = useState(false);
  const [renewed, updateRenewed] = useState(false);
  return (
    <>
      <Typography variant="h2">GUID Generator</Typography>
      <Box className={classes.root}>
        <Typography variant="h3">{guid}</Typography>
        <Box>
          <Button
            endIcon={<FileCopyIcon />}
            variant="contained"
            color="primary"
            onClick={() => {
              navigator.clipboard.writeText(guid);
              updateCopied(true);
            }}
          >
            Copy
          </Button>
          <Button
            endIcon={<AutorenewIcon />}
            variant="contained"
            color="secondary"
            onClick={() => {
              updateGuid(newGuid());
              updateRenewed(true);
            }}
          >
            Renew
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={copied}
        autoHideDuration={2000}
        onClose={() => {
          updateCopied(false);
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        message={"The Guid as been copied to your clipboard"}
      />
      <Snackbar
        open={renewed}
        autoHideDuration={2000}
        onClose={() => updateRenewed(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        message={"Here is a new Guid"}
      />
    </>
  );
};

export default GuidView;
