import { Box, Button, ButtonGroup, makeStyles, Snackbar, Typography } from "@material-ui/core";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";
import AssignmentReturnedIcon from "@material-ui/icons/AssignmentReturned";
import GetAppIcon from "@material-ui/icons/GetApp";
import PhotoSizeSelectSmallIcon from "@material-ui/icons/PhotoSizeSelectSmall";
import React, { useState } from "react";
import MonacoEditor from "react-monaco-editor";
import theme from "../style/theme";

const useStyles = makeStyles({
  root: {
    transition: "opacity 0.3s ease-out",
    marginTop: 16,
    width: "calc(100vw - 120px)",
    height: "calc(100vh - 140px)",
    flex: "1",
    border: "1px solid #ddd",
  },
});

const JsonView: React.FC = () => {
  const classes = useStyles();
  const [json, updateJson] = useState("{}");
  const [message, updateMessage] = useState("");
  const [drag, updateDrag] = useState(false);

  const prettify = () => {
    try {
      updateJson(JSON.stringify(JSON.parse(json), null, 2));
      updateMessage("JSON prettified");
    } catch {
      updateMessage("Invalid format");
    }
  };
  const minify = () => {
    try {
      updateJson(JSON.stringify(JSON.parse(json)));
      updateMessage("JSON minified");
    } catch {
      updateMessage("Invalid format");
    }
  };
  const copy = () => {
    window.navigator.clipboard.writeText(json);
    updateMessage("Copied in your clipboard");
  };
  const download = () => {
    const b = new Blob([json]);
    const e = document.createEvent("MouseEvents");
    const a = document.createElement("a");
    a.download = `${new Date().toISOString()}.json`;
    a.href = window.URL.createObjectURL(b);
    a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
    e.initEvent("click", true, false);
    a.dispatchEvent(e);
  };

  return (
    <>
      <Typography variant="h2" style={{ justifyContent: "space-between", display: "flex" }}>
        JSON parser
        <span style={{ display: "flex", flex: "1", alignItems: "end", justifyContent: "flex-end" }}>
          <div
            style={{
              marginTop: -50,
              fontSize: drag ? "1.8rem" : "1rem",
              width: "calc(100vw - 800px)",
              border: "1px dashed black",
              background: drag ? theme.palette.primary.dark : theme.palette.primary.main,
              marginRight: 16,
              height: 88,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 4,
              transition: "all 0.3s ease-out",
              color: "white",
            }}
            onDrop={(e) => {
              e.preventDefault();
              var files = e.dataTransfer.items || e.dataTransfer.files;
              console.log("files", files.length);
              if (files.length === 1) {
                console.log("file!", files[0]);
                var file = files[0].getAsFile();
                if (file) {
                  (file as any).text().then((data: string) => {
                    console.log("data", data);
                    updateJson(data);
                    updateMessage("File imported");
                  });
                }
                updateDrag(false);
              }
            }}
            onDragEnter={(e) => {
              updateDrag(true);
              e.preventDefault();
            }}
            onDragLeave={(e) => {
              updateDrag(false);
              e.preventDefault();
            }}
            onDragOver={(e) => {
              e.preventDefault();
            }}
          >
            Drop here
          </div>
          <div>
            <ButtonGroup variant="contained" color="primary">
              <Button startIcon={<AspectRatioIcon />} onClick={prettify}>
                Prettify
              </Button>
              <Button startIcon={<PhotoSizeSelectSmallIcon />} onClick={minify}>
                Minify
              </Button>
              <Button startIcon={<AssignmentReturnedIcon />} onClick={copy}>
                Copy
              </Button>
              <Button startIcon={<GetAppIcon />} onClick={download}>
                Download
              </Button>
            </ButtonGroup>
          </div>
        </span>
      </Typography>
      <Box className={classes.root}>
        <MonacoEditor
          width="calc(100vw - 140px)"
          height="calc(100vh - 164px)"
          language="json"
          theme="vs"
          value={json}
          options={{
            selectOnLineNumbers: true,
          }}
          onChange={(value) => {
            updateJson(value);
          }}
        />
      </Box>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={!!message}
        autoHideDuration={6000}
        onClose={() => updateMessage("")}
        message={message}
      />
    </>
  );
};

export default JsonView;
