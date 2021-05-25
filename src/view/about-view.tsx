import { makeStyles, Typography } from "@material-ui/core";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React from "react";
import Main from "../component/main";
import sealCSM from "../images/seal-csm.png";

const options = {
  plotOptions: {
    pie: {
      dataLabels: {
        distance: -45,
      },
    },
  },
  chart: {
    type: "pie",
  },
  title: {
    text: "Agile<br/>development",
    verticalAlign: "middle",
    floating: true,
  },
  credits: { enabled: false },
  tooltip: { enabled: false },
  responsive: {
    rules: [
      {
        condition: { maxWidth: 400 },
        chartOptions: {
          plotOptions: {
            pie: {
              dataLabels: {
                distance: -35,
              },
            },
          },
        },
      },
    ],
  },
  series: [
    {
      minPointSize: 10,
      innerSize: "50%",
      zMin: 0,
      slicedOffset: 5,
      name: "steps",
      data: [
        {
          name: "Brainstorming",
          y: 100,
          z: 90,
          color: "#0D2F87",
          sliced: true,
        },
        {
          name: "UX",
          y: 100,
          z: 120,
          color: "#E24444",
          sliced: true,
        },
        {
          name: "Implementation",
          y: 100,
          z: 100,
          color: "#1D3F97",
          sliced: true,
        },
        {
          name: "Testing",
          y: 100,
          z: 124.6,
          color: "#C22424",
          sliced: true,
        },
        {
          name: "CI/CD",
          y: 100,
          z: 70,
          color: "#4D6FC7",
          sliced: true,
        },
      ],
    },
  ],
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    "& .highcharts-container ": {
      width: "auto !important",
    },
    "& svg": {
      width: "100%",
      "& .highcharts-title": {
        fontSize: "18px !important",
        [theme.breakpoints.down("md")]: {
          fontSize: "16px !important",
        },
        [theme.breakpoints.down("sm")]: {
          fontSize: "14px !important",
        },
        [theme.breakpoints.down("xs")]: {
          fontSize: "12px !important",
        },
      },
      "& .highcharts-text-outline": {
        display: "none",
      },
      "& .highcharts-label": {
        "& text": {
          fontWeight: "normal !important",
          fontSize: "15px !important",
          [theme.breakpoints.down("md")]: {
            fontSize: "14px !important",
          },
          [theme.breakpoints.down("sm")]: {
            fontSize: "12px !important",
          },
          [theme.breakpoints.down("xs")]: {
            fontSize: "10px !important",
          },
        },
      },
    },
  },
  textBlock: {
    textAlign: "center",
    padding: "16px 65px",
  },
  seal: {
    "& img": {
      width: 200,
    },
    margin: "auto",
  },
}));

const AboutView = () => {
  const classes = useStyles();
  return (
    <Main
      title="About"
      path=""
      description="Hello, I'm Hugo Carnicelli Fullstack Developer"
    >
      <div className={classes.root}>
        <div className={classes.container}>
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            callback={(chart: any) => chart.reflow()}
          />
        </div>
        <Typography variant="body1" className={classes.textBlock}>
          After <b>10+ years</b> working as a <b>web</b> developer, I have
          aquired a strong taste for the <b>Agile Scrum</b> methodology and
          continuous improvement.
        </Typography>

        <Typography variant="body1" className={classes.textBlock}>
          I now have a solid track record of <b>delivering</b> web applications
          from specification and UX to release management.
        </Typography>
        <Typography variant="body1" className={classes.textBlock}>
          I am also keen to tackle challenges such as Technical Debt management,
          Automated Testing, Continuous Delivery and Performance improvement.
        </Typography>

        <a
          href="https://certification.scrumalliance.org/accounts/1094861-hugo-carnicelli/certifications/1248700-csm"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.seal}
        >
          <img alt="Scrum Alliance CSM badge" src={sealCSM} />
        </a>
      </div>
    </Main>
  );
};

export default AboutView;
