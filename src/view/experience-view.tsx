import {
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  makeStyles,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@material-ui/core";
import LabelIcon from "@material-ui/icons/Label";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import WorkIcon from "@material-ui/icons/Work";
import React from "react";
import theme from "../style/theme";
import Main from "../component/main";

const resume = {
  experiences: [
    {
      timeframe: "March 2021 - Present",
      company: "Leyline",
      title: "Fullstack Engineer",
      location: "Full Remote",
      project: {
        name: "Web application maintenance and evolution",
        items: [
          "Front end improvement and bug fixes",
          "Backend maintenance",
          "Klaytn blockchain integration",
          "CI setup",
          "Agile practices improvements",
        ],
        techs: [
          "Scrum",
          "React",
          "NodeJS",
          "Typescript / Javascript",
          "Git",
          "Firebase / Google Cloud",
          "Visual Studio Code",
          "Docker",
          "ZenHub",
        ],
      },
    },
    {
      timeframe: "September 2020 - Febuary 2021 (6 mos)",
      company: "Crezco",
      title: "Senior Developer",
      location: "London, United Kingdom",
      project: {
        name: "Corporate website and web app",
        items: [
          "Front-end implementation (Figma designs to functionnal website",
          "UI rework and improvements",
          "Backend architecture rationalization",
          "Peer to peer payment features",
          "Authenticated user dashboard",
          "Workflow system integration",
          "E2E tests runner (Docker)",
          "Release management and CI/CD pipelines update",
          "Partial remote working",
          "Agile practices improvements",
        ],
        techs: [
          "Scrum",
          "React",
          "Blazor",
          "ASP.NET Core",
          "Git",
          "Material-UI",
          "Azure",
          "SQL Server",
          "Entity Framework",
          "CI/DC",
          "Unit/Integration/E2E testing",
          "Cypress",
          "Elsa Workflows",
          "Lottie",
          "Visual Studio Code",
          "Visual Studio",
          "Seq",
          "Jira",
          "Docker",
        ],
      },
    },
    {
      timeframe: "Jul 2019 - August 2020 (13 mos)",
      company: "LEAP Legal Software UK",
      title: "Lead Software Developer",
      location: "London, United Kingdom",
      project: {
        name: "Creation of an AppStore / Marketplace system",
        items: [
          "Front-end migration (from Angular to React) and evolution",
          "UI rework",
          "Back-end maintenance and refactoring",
          "Continuous delivery",
          "Product continuous improvement",
          "Performance and health monitoring",
          "Partial remote working",
          "Synchronization with teams located in Australia",
          "Introduction of Agile practices",
          "Workflow app design and prototyping",
        ],
        techs: [
          "React",
          "ASP.NET Core",
          "Git",
          "Material-UI",
          "AWS S3 Bucket",
          "AWS CloudFront",
          "AWS Elasticsearch Service",
          "AWS CodePipeline",
          "MySQL",
          "Jira",
          "Kibana",
          "Auth0",
          "Visual Studio Code",
          "Visual Studio",
        ],
      },
    },
    {
      timeframe: "Aug 2018 - Jun 2019 (11 mos)",
      company: "Societe Generale Corporate and Investment Banking - SGCIB",
      title: "Tech lead / Senior developer",
      location: "Paris, France",
      project: {
        name: "Development, maintenance and industrialization of the different reporting solutions",
        items: [
          "Agile method - 2 weeks sprints",
          "Business needs analysis and tasks break-down",
          "Help architecturing the Big Data solution",
          "Databases design",
          "Reporting webservices implementation",
          "Front end UI/UX implementation",
          "Evolutives maintenance regarding existing products",
          "Technical debt reduction plan",
          "Continuous deployment improvement",
          "Help collaborating with external teams",
          "Monitoring dashboard implementation",
        ],
        techs: [
          " C#",
          ".NET",
          "ASP.NET Core",
          "Preact",
          "SSAS",
          "DAX",
          "PostgreSQL",
          "React",
          "Redux",
          "webpack",
          "Swagger",
          "Kibana",
          "JIRA",
          "XL Deploy",
          "Visual Studio",
          "Visual Studio Code",
          "DBeaver",
          "DAX Studio",
          "Github",
          "Git",
          "Highchart",
          "AgGrid",
          "Paket",
        ],
      },
    },
    {
      timeframe: "Nov 2016 - Apr 2018 (1 yr 6 mos)",
      company: "Betclic Everest Group",
      title: "Senior developer",
      location: "Paris, France",
      project: {
        name: "Integrated the Sport team to handle sport's betting features",
        items: [
          "Mobile web application recast to target the brand new native Mobile application",
          "Evolutive maintenance on existing multitenant API and mixed Front ends",
          "English speaking team",
        ],
        techs: [
          "Angular 5",
          "Agile",
          "TDD",
          "Protractor",
          "E2E tests",
          "Visual Studio",
          "Progressive WebApp",
          "HTML5",
          "CSS3",
          "ASP.NET WebApi",
          "Swagger",
          "TFS",
          "Git",
          "VSO",
          "TeamCity",
          "C#",
          ".NET",
          "ASP.NET MVC",
          "Nuget",
          "Paket",
          "Kibana",
        ],
      },
    },
    {
      timeframe: "Apr 2014 - Oct 2016 (2 yrs 7 mos)",
      company: "SoftFluent",
      title: ".NET Consultant",
      location: "Paris, France",
      project: {
        name: "Several technico-functional missions on .NET ecosystem",
        items: [
          "Corporate contact mobile application implementation",
          "Rebranding a developer product to target a larger audience",
          "Technical articles writing",
          "Product recommandation mobile application implementation",
          "Expense reports mobile application implementation",
          "Corporate website recast implementation and team leading",
          "Insurance company managerial websites evolutive maintenance",
          "Electronic Document Management web application conception and implementation",
          "Insurance company Front/Back Office websites evolutive maintenance",
        ],
        techs: [
          "Xamarin",
          "Windows Phone 8",
          "ASP.NET Webform",
          "VB",
          "C# .NET",
          "Bootstrap",
          "T-SQL",
          "SQL Server",
          "Aspose",
          "jQuery",
          "Visual Studio",
          "SVN",
          "TFS",
          "CodeFluent Entities",
          "JIRA",
        ],
      },
    },
    {
      timeframe: "Jan 2013 - Apr 2014 (1 yr 4 mos)",
      company: "Groupe Altimate",
      title: ".NET Consultant",
      location: "Paris, France",
      project: {
        name: "Missions on .NET ecosystem.",
      },
    },
    {
      timeframe: "Apr 2010 - Dec 2012 (2 yrs 9 mos)",
      company: "FLAG Informatique",
      title: "Developer analyst",
      location: "Paris, France",
      project: {
        name: "Developement and maintenance regarding managerial intranet and extranet web portals and event websites.",
      },
    },
  ],
};

const useStyles = makeStyles({
  root: {
    maxWidth: 800,
  },
  headTime: {
    fontWeight: 700,
    fontFamily: "'Titillium Web', sans-serif",
    color: theme.palette.secondary.light,
    letterSpacing: 0.5,
    lineHeight: "16px",
  },
  headTitle: {
    fontWeight: 700,
    fontFamily: "'Titillium Web', sans-serif",
    color: theme.palette.primary.dark,
    letterSpacing: 2,
    lineHeight: "24px",
  },
  headSubtitle: {
    color: theme.palette.grey[700],
    lineHeight: "16px",
  },
  headLocation: { color: "rgba(0, 0, 0, 0.54)" },
  techs: { marginLeft: 16 },
});

const ExperienceView: React.FC = () => {
  const classes = useStyles();
  return (
    <Main
      title="Experience"
      path="experience"
      description="10+ years in the web development arena"
    >
      <div className={classes.root}>
        <Typography variant="h2">Experience</Typography>
        <Stepper orientation="vertical">
          {resume.experiences.map((exp, i) => (
            <Step expanded key={i}>
              <StepLabel
                icon={
                  <Avatar>{i === 0 ? <LocationOnIcon /> : <WorkIcon />}</Avatar>
                }
              >
                <Typography className={classes.headTime}>
                  {exp.timeframe}
                </Typography>
                <Typography className={classes.headTitle}>
                  {exp.company}
                </Typography>
                <Typography className={classes.headSubtitle}>
                  {exp.title}
                </Typography>
                <Typography variant="caption" className={classes.headLocation}>
                  {exp.location}
                </Typography>
              </StepLabel>
              <StepContent>
                {exp.project.items ? (
                  <List
                    dense
                    subheader={
                      <ListSubheader>{exp.project.name}:</ListSubheader>
                    }
                  >
                    {exp.project.items.map((item, i) => (
                      <ListItem key={`item-${i}`}>
                        <ListItemAvatar>
                          <LabelIcon />
                        </ListItemAvatar>
                        <ListItemText>{item}</ListItemText>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <div className="MuiListSubheader-root MuiListSubheader-gutters">
                    {exp.project.name}
                  </div>
                )}
                {exp.project.techs && (
                  <div className={classes.techs}>
                    {exp.project.techs.map((item, i) => (
                      <Chip
                        key={`tech-${i}`}
                        variant="outlined"
                        color="secondary"
                        size="small"
                        label={item}
                      />
                    ))}
                  </div>
                )}
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </div>
    </Main>
  );
};

export default ExperienceView;
