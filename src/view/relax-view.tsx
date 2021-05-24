import {
  faCloudRain,
  faKiwiBird,
  faPause,
  faTree,
  faUmbrellaBeach,
  IconDefinition,
  faFrog,
  faCampground,
  faWater,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress, Fab, makeStyles, useMediaQuery, Paper } from "@material-ui/core";
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
    display: "flex",
    justifyContent: "center",
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

export interface ISound {
  id: string;
  label: string;
  icon: IconDefinition;
  imageUrl: string;
  soundUrl: string;
  imageCredit: string;
  soundCredit: string;
}

export const sounds: ISound[] = [
  {
    id: "forest",
    label: "Forest",
    icon: faTree,
    imageUrl:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    soundUrl: "https://freesound.org/data/previews/506/506678_1648170-hq.mp3",
    imageCredit: "Sebastian Unrau",
    soundCredit: "https://freesound.org/s/506678/",
  },
  {
    id: "birds",
    label: "Birds",
    icon: faKiwiBird,
    imageUrl:
      "https://images.unsplash.com/photo-1588026903866-438d3354344a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1347&q=80",
    soundUrl: "https://freesound.org/data/previews/204/204804_1728127-hq.mp3",
    imageCredit: "Kris Van Sebroeck",
    soundCredit: "https://freesound.org/s/204804/",
  },
  {
    id: "waves",
    label: "Waves",
    icon: faUmbrellaBeach,
    imageUrl:
      "https://images.unsplash.com/photo-1528463080017-2a21334d00e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    soundUrl: "https://freesound.org/data/previews/342/342331_1421245-hq.mp3",
    imageCredit: "Mohamed Masaau",
    soundCredit: "https://freesound.org/s/342331/",
  },
  {
    id: "rain",
    label: "Rain",
    icon: faCloudRain,
    imageUrl:
      "https://images.unsplash.com/photo-1438449805896-28a666819a20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    soundUrl: "https://freesound.org/data/previews/344/344430_6182353-hq.mp3",
    imageCredit: "Inge Maria",
    soundCredit: "https://freesound.org/s/344430/",
  },
  {
    id: "frog",
    label: "Frogs",
    icon: faFrog,
    imageUrl:
      "https://images.unsplash.com/photo-1524538813-1d2e4e975e1c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80",
    soundUrl: "https://freesound.org/data/previews/420/420919_1661766-hq.mp3",
    imageCredit: "Drew Brown",
    soundCredit: "https://freesound.org/s/420919/",
  },
  {
    id: "crickets",
    label: "Crickets",
    icon: faCampground,
    imageUrl:
      "https://images.unsplash.com/photo-1585987963039-6dc9b3b00b39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    soundUrl: "https://freesound.org/data/previews/436/436105_1648170-lq.mp3",
    imageCredit: "Evgenii Pliusnin",
    soundCredit: "https://freesound.org/s/436105/",
  },
  {
    id: "creek",
    label: "Creek",
    icon: faWater,
    imageUrl:
      "https://images.unsplash.com/photo-1563132178-7e280b42c4ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    soundUrl: "https://freesound.org/data/previews/459/459115_7243693-lq.mp3",
    imageCredit: "Lauren George",
    soundCredit: "https://freesound.org/s/459115/",
  },
];

const RelaxView: React.FC = () => {
  const classes = useStyles();
  const isMobile = !useMediaQuery("(min-width:800px)");

  const ThemePlayer = ({ theme }: { theme: ISound }) => {
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
          <source src={theme.soundUrl} type="audio/mpeg" />
        </audio>
        {playing && (
          <div className={classes.background} style={{ backgroundImage: `url('${theme.imageUrl}')` }}>
            <Paper style={{ position: "absolute", padding: 16, bottom: 16 }}>
              Image: {theme.imageCredit} - Sound:{" "}
              <a href={theme.soundCredit} target="_blank" rel="noopener noreferrer">
                {theme.soundCredit}
              </a>
            </Paper>
          </div>
        )}
      </div>
    );
  };

  return (
    <Main
      title="Zenmerry"
      path="zenmerry"
      description="Lightweight version of the 'Zenmerry - Play and relax' app"
      backButton
    >
      <a href="https://play.google.com/store/apps/details?id=com.zenmerry" style={{ zIndex: 1200 }}>
        <img
          src="https://lh3.googleusercontent.com/cjsqrWQKJQp9RFO7-hJ9AfpKzbUb_Y84vXfjlP0iRHBvladwAfXih984olktDhPnFqyZ0nu9A5jvFwOEQPXzv7hr3ce3QVsLN8kQ2Ao=s0"
          alt="Zenmerry - Play and relax on Google Play"
        />
      </a>
      <div className={classes.root} style={isMobile ? { flexDirection: "column" } : {}}>
        <br />
        {sounds.map((theme) => (
          <ThemePlayer key={theme.id} theme={theme} />
        ))}
      </div>
    </Main>
  );
};

export default RelaxView;
