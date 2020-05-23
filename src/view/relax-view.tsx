import { faCloudRain, faKiwiBird, faPause, faTree, faUmbrellaBeach } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress, Fab, makeStyles, useMediaQuery } from "@material-ui/core";
import React, { useRef, useState } from "react";
import theme from "../style/theme";

// FOREST (https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)
// https://freesound.org/data/previews/506/506678_1648170-lq.mp3
// https://freesound.org/data/previews/506/506678_1648170-hq.mp3

// RAIN
// https://freesound.org/data/previews/344/344430_6182353-lq.mp3
// https://freesound.org/data/previews/344/344430_6182353-hq.mp3

// BEACH
// https://freesound.org/data/previews/342/342331_1421245-lq.mp3
// https://freesound.org/data/previews/342/342331_1421245-hq.mp3

const useStyles = makeStyles({
  root: {
    flex: "1",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  background: {
    backgroundPosition: "center",
    // filter: "blur(1px)",
    filter: "contrast(150%) sepia(80%)",
    width: "calc(100vw - 48px)",
    height: "100vh",
    position: "fixed",
    backgroundSize: "cover",
    right: 0,
    top: 0,
  },
  players: {
    display: "none",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
    "& .svg-inline--fa": {
      fontSize: "1.4rem",
    },
    "& .MuiFab-root": {
      margin: 32,
      zIndex: 2000,
    },
  },
  fabProgress: {
    // color: green[500],
    position: "absolute",
    top: 28,
    left: 28,
    zIndex: 1,
  },
});

// birds
type theme = "forest" | "rain" | "beach" | "birds";

const RelaxView: React.FC = () => {
  const classes = useStyles();
  const [isForest, updateIsForest] = useState(false);
  const [isRain, updateIsRain] = useState(false);
  const [isBeach, updateIsBeach] = useState(false);
  const [isBirds, updateIsBirds] = useState(false);
  const isMobile = !useMediaQuery("(min-width:800px)");

  let background = "";
  if (isForest) {
    background =
      "url('https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')";
  }
  if (isRain) {
    background =
      "url('https://images.unsplash.com/photo-1438449805896-28a666819a20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')";
  }
  if (isBeach) {
    background =
      "url('https://images.unsplash.com/photo-1528463080017-2a21334d00e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')";
  }
  if (isBirds) {
    background =
      "url('https://images.unsplash.com/photo-1588026903866-438d3354344a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1347&q=80')";
  }

  const refForestPlayer = useRef<HTMLAudioElement | null>(null);
  const refRainPlayer = useRef<HTMLAudioElement | null>(null);
  const refBeachPlayer = useRef<HTMLAudioElement | null>(null);
  const refBirdsPlayer = useRef<HTMLAudioElement | null>(null);
  const pause = () => {
    updateIsForest(false);
    updateIsRain(false);
    updateIsBeach(false);
    updateIsBirds(false);
    if (refForestPlayer.current && refRainPlayer.current && refBeachPlayer.current && refBirdsPlayer.current) {
      refForestPlayer.current.pause();
      refRainPlayer.current.pause();
      refBeachPlayer.current.pause();
      refBirdsPlayer.current.pause();
    }
  };
  const play = (theme: theme) => {
    if (refForestPlayer.current && refRainPlayer.current && refBeachPlayer.current && refBirdsPlayer.current) {
      updateIsForest(false);
      updateIsRain(false);
      updateIsBeach(false);
      updateIsBirds(false);
      refForestPlayer.current.pause();
      refRainPlayer.current.pause();
      refBeachPlayer.current.pause();
      refBirdsPlayer.current.pause();
      switch (theme) {
        case "forest":
          refForestPlayer.current.play();
          updateIsForest(true);
          break;
        case "rain":
          refRainPlayer.current.play();
          updateIsRain(true);
          break;
        case "beach":
          refBeachPlayer.current.play();
          updateIsBeach(true);
          break;
        case "birds":
          refBirdsPlayer.current.play();
          updateIsBirds(true);
          break;
      }
    }
  };
  const Wrapper = ({ icon, active, theme }: { icon: React.ReactElement; theme: theme; active?: boolean }) => (
    <div className={classes.wrapper}>
      <Fab color="primary" onClick={() => (!active ? play(theme) : pause())}>
        {!active ? icon : <FontAwesomeIcon icon={faPause} />}
      </Fab>
      {active && <CircularProgress size={64} className={classes.fabProgress} />}
    </div>
  );

  return (
    <>
      <div className={classes.root} style={isMobile ? { flexDirection: "column" } : {}}>
        <div className={classes.background} style={{ backgroundImage: background }}></div>
        <Wrapper icon={<FontAwesomeIcon icon={faTree} />} active={isForest} theme="forest" />
        <Wrapper icon={<FontAwesomeIcon icon={faCloudRain} />} active={isRain} theme="rain" />
        <Wrapper icon={<FontAwesomeIcon icon={faUmbrellaBeach} />} active={isBeach} theme="beach" />
        <Wrapper icon={<FontAwesomeIcon icon={faKiwiBird} />} active={isBirds} theme="birds" />
      </div>
      <div className={classes.players}>
        {refForestPlayer && (
          <audio controls ref={refForestPlayer}>
            <source src="https://freesound.org/data/previews/506/506678_1648170-hq.mp3" type="audio/mpeg" />
          </audio>
        )}
        <audio controls ref={refRainPlayer}>
          <source src="https://freesound.org/data/previews/344/344430_6182353-hq.mp3" type="audio/mpeg" />
        </audio>
        <audio controls ref={refBeachPlayer}>
          <source src="https://freesound.org/data/previews/342/342331_1421245-hq.mp3" type="audio/mpeg" />
        </audio>
        <audio controls ref={refBirdsPlayer}>
          <source src="https://freesound.org/data/previews/204/204804_1728127-hq.mp3" type="audio/mpeg" />
        </audio>
      </div>
    </>
  );
};

export default RelaxView;
