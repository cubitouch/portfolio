import {
  faCloudRain,
  faKiwiBird,
  faPause,
  faTree,
  faUmbrellaBeach,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress, Fab, makeStyles, useMediaQuery } from "@material-ui/core";
import React, { useRef, useState } from "react";
import theme from "../style/theme";
import Main from "../component/main";

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
    "& audio": { display: "none" },
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

interface ITheme {
  type: string;
  icon: IconDefinition;
  image: string;
  sound: string;
}
const themes: ITheme[] = [
  {
    type: "forest",
    icon: faTree,
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    sound: "https://freesound.org/data/previews/506/506678_1648170-hq.mp3",
  },
  {
    type: "rain",
    icon: faCloudRain,
    image:
      "https://images.unsplash.com/photo-1438449805896-28a666819a20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    sound: "https://freesound.org/data/previews/344/344430_6182353-hq.mp3",
  },
  {
    type: "beach",
    icon: faUmbrellaBeach,
    image:
      "https://images.unsplash.com/photo-1528463080017-2a21334d00e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    sound: "https://freesound.org/data/previews/342/342331_1421245-hq.mp3",
  },
  {
    type: "birds",
    icon: faKiwiBird,
    image:
      "https://images.unsplash.com/photo-1588026903866-438d3354344a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1347&q=80",
    sound: "https://freesound.org/data/previews/204/204804_1728127-hq.mp3",
  },
];

const RelaxView: React.FC = () => {
  const classes = useStyles();
  const isMobile = !useMediaQuery("(min-width:800px)");

  const ThemePlayer = ({ theme }: { theme: ITheme }) => {
    const classes = useStyles();
    const [playing, updatePlaying] = useState(false);
    const refPlayer = useRef<HTMLAudioElement | null>(null);
    const play = () => {
      if (refPlayer.current) {
        updatePlaying(true);
        refPlayer.current.play();
      }
    };
    const pause = () => {
      if (refPlayer.current) {
        updatePlaying(false);
        refPlayer.current.pause();
      }
    };
    return (
      <div className={classes.wrapper}>
        <Fab color="primary" onClick={() => (!playing ? play() : pause())}>
          <FontAwesomeIcon icon={!playing ? theme.icon : faPause} />
        </Fab>
        {playing && <CircularProgress size={64} className={classes.fabProgress} />}
        <audio controls ref={refPlayer}>
          <source src={theme.sound} type="audio/mpeg" />
        </audio>
        {playing && <div className={classes.background} style={{ backgroundImage: `url('${theme.image}')` }}></div>}
      </div>
    );
  };

  return (
    <Main title="Relax" path="relax" description="Use this tool to listen to ambiant relaxing sounds" backButton>
      <div className={classes.root} style={isMobile ? { flexDirection: "column" } : {}}>
        {themes.map((theme) => (
          <ThemePlayer key={theme.type} theme={theme} />
        ))}
      </div>
    </Main>
  );
};

export default RelaxView;
