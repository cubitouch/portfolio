import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Fab, makeStyles, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import Main from "../component/main";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: "1",
    justifyContent: "center",
  },
  encoder: {
    width: "100%",
    display: "flex",
    marginTop: 16,
    alignItems: "center",
    flex: "1",
    height: "100%",
    "& .MuiTextField-root": { flex: "1", height: "100%", "& textarea": { height: "100% !important" } },
    "& .MuiInputBase-root": { height: "100%" },
    "& .MuiFab-root": { margin: 8 },
  },
});

const CustomInput = ({ label, value, updater }: { label: string; value: string; updater: (value: string) => void }) => {
  return (
    <TextField
      label={label}
      multiline
      variant="outlined"
      value={value}
      onChange={(e) => updater(e.currentTarget.value)}
    />
  );
};
const EncodersView: React.FC = () => {
  const classes = useStyles();
  const [base64, updateBase64] = useState("SGVsbG8gd29ybGQ=");
  const [base64Decoded, updateBase64Decoded] = useState("Hello world");
  const [url, updateUrl] = useState("Hello%2C%20I'm%20Hugo%20CARNICELLI%2C%20Fullstack%20Developer");
  const [urlDecoded, updateUrlDecoded] = useState("Hello, I'm Hugo CARNICELLI, Fullstack Developer");

  return (
    <Main
      title="Base64 &amp; URL"
      path="encoders"
      description="Use this tool to convert Base64 and URL to and from encoded values"
    >
      <Typography variant="h2">Base64 &amp; URL</Typography>
      <Box className={classes.root}>
        <Box className={classes.encoder}>
          <CustomInput
            label="Base64"
            value={base64}
            updater={(value) => {
              updateBase64(value);
              try {
                updateBase64Decoded(atob(value));
              } catch {
                // error state on FAB
              }
            }}
          />
          <Fab disabled size="small">
            <FontAwesomeIcon icon={faExchangeAlt} />
          </Fab>
          <CustomInput
            label="Decoded Base64"
            value={base64Decoded}
            updater={(value) => {
              updateBase64Decoded(value);
              try {
                updateBase64(btoa(value));
              } catch {
                // error state on FAB
              }
            }}
          />
        </Box>
        <Box className={classes.encoder}>
          <CustomInput
            label="URL"
            value={url}
            updater={(value) => {
              updateUrl(value);
              try {
                updateUrlDecoded(decodeURIComponent(value));
              } catch {
                // error state on FAB
              }
            }}
          />
          <Fab disabled size="small">
            <FontAwesomeIcon icon={faExchangeAlt} />
          </Fab>
          <CustomInput
            label="Decoded URL"
            value={urlDecoded}
            updater={(value) => {
              updateUrlDecoded(value);
              try {
                updateUrl(encodeURI(value));
              } catch {
                // error state on FAB
              }
            }}
          />
        </Box>
      </Box>
    </Main>
  );
};

export default EncodersView;
