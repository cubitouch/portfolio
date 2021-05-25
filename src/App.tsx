import { Box, ThemeProvider, Typography } from "@material-ui/core";
import { usePath, useRoutes } from "raviger";
import React, { useEffect, useState } from "react";
import ReactGA from "react-ga";
import "./App.css";
import Main from "./component/main";
import theme from "./style/theme";
import AboutView from "./view/about-view";
import EncodersView from "./view/encoders-view";
import ExperienceView from "./view/experience-view";
import GuidView from "./view/guid-view";
import JsonView from "./view/json-view";
import RelaxView from "./view/relax-view";
import ToolsView from "./view/tools-view";

const App: React.FC = () => {
  const [hasGAInitialized, updateHasGAInitialized] = useState(false);
  const path = usePath();
  const [currentPath, updateCurrentPath] = useState("");
  if (!hasGAInitialized) {
    ReactGA.initialize("UA-166014611-1");
    updateHasGAInitialized(true);
  }
  useEffect(() => {
    // trigger GA if path as changed
    if (hasGAInitialized && currentPath !== path) {
      ReactGA.pageview(path);
      updateCurrentPath(path);
    }
  }, [currentPath, hasGAInitialized, path]);

  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  );
};

const Router = () => {
  const routeResult = useRoutes(
    {
      "": () => <AboutView />,
      "/experience": () => <ExperienceView />,
      "/tools": () => <ToolsView />,
      "/guid": () => <GuidView />,
      "/json": () => <JsonView />,
      "/encoders": () => <EncodersView />,
      "/zenmerry": () => <RelaxView />,
      "/zenmerry/privacy": () => <PrivacyZenmerryView />,
    },
    { matchTrailingSlash: true }
  );
  return (
    routeResult || (
      <Typography variant="h2">
        &#129300; Oops, I can't find what you are looking for...
      </Typography>
    )
  );
};

const PrivacyZenmerryView = () => {
  return (
    <Main
      title="Zenmerry - Privacy Policy"
      path="zenmerry/privacy"
      description="Privacy statement for Zenmerry app"
      backButton
    >
      <Typography variant="h2">Zenmerry - Privacy Policy</Typography>
      <Box>
        <p>
          Hugo Carnicelli built the Zenmerry app as a Free app. This SERVICE is
          provided by Hugo Carnicelli at no cost and is intended for use as is.
        </p>
        <p>
          This page is used to inform visitors regarding my policies with the
          collection, use, and disclosure of Personal Information if anyone
          decided to use my Service.
        </p>
        <p>
          If you choose to use my Service, then you agree to the collection and
          use of information in relation to this policy. The Personal
          Information that I collect is used for providing and improving the
          Service. I will not use or share your information with anyone except
          as described in this Privacy Policy.
        </p>
        <p>
          The terms used in this Privacy Policy have the same meanings as in our
          Terms and Conditions, which is accessible at Zenmerry unless otherwise
          defined in this Privacy Policy.
        </p>
        <p>
          <strong>Information Collection and Use</strong>
        </p>
        <p>
          For a better experience, while using our Service, I may require you to
          provide us with certain personally identifiable information, including
          but not limited to None. The information that I request will be
          retained on your device and is not collected by me in any way.
        </p>
        <div>
          <p>
            The app does use third party services that may collect information
            used to identify you.
          </p>
          <p>
            Link to privacy policy of third party service providers used by the
            app
          </p>
          <ul>
            <li>
              <a
                href="https://www.google.com/policies/privacy/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Google Play Services
              </a>
            </li>
          </ul>
        </div>
        <p>
          <strong>Log Data</strong>
        </p>
        <p>
          I want to inform you that whenever you use my Service, in a case of an
          error in the app I collect data and information (through third party
          products) on your phone called Log Data. This Log Data may include
          information such as your device Internet Protocol (“IP”) address,
          device name, operating system version, the configuration of the app
          when utilizing my Service, the time and date of your use of the
          Service, and other statistics.
        </p>
        <p>
          <strong>Cookies</strong>
        </p>
        <p>
          Cookies are files with a small amount of data that are commonly used
          as anonymous unique identifiers. These are sent to your browser from
          the websites that you visit and are stored on your device's internal
          memory.
        </p>
        <p>
          This Service does not use these “cookies” explicitly. However, the app
          may use third party code and libraries that use “cookies” to collect
          information and improve their services. You have the option to either
          accept or refuse these cookies and know when a cookie is being sent to
          your device. If you choose to refuse our cookies, you may not be able
          to use some portions of this Service.
        </p>
        <p>
          <strong>Service Providers</strong>
        </p>
        <p>
          I may employ third-party companies and individuals due to the
          following reasons:
        </p>
        <ul>
          <li>To facilitate our Service;</li>{" "}
          <li>To provide the Service on our behalf;</li>
          <li>To perform Service-related services; or</li>{" "}
          <li>To assist us in analyzing how our Service is used.</li>
        </ul>
        <p>
          I want to inform users of this Service that these third parties have
          access to your Personal Information. The reason is to perform the
          tasks assigned to them on our behalf. However, they are obligated not
          to disclose or use the information for any other purpose.
        </p>
        <p>
          <strong>Security</strong>
        </p>
        <p>
          I value your trust in providing us your Personal Information, thus we
          are striving to use commercially acceptable means of protecting it.
          But remember that no method of transmission over the internet, or
          method of electronic storage is 100% secure and reliable, and I cannot
          guarantee its absolute security.
        </p>
        <p>
          <strong>Links to Other Sites</strong>
        </p>
        <p>
          This Service may contain links to other sites. If you click on a
          third-party link, you will be directed to that site. Note that these
          external sites are not operated by me. Therefore, I strongly advise
          you to review the Privacy Policy of these websites. I have no control
          over and assume no responsibility for the content, privacy policies,
          or practices of any third-party sites or services.
        </p>
        <p>
          <strong>Children’s Privacy</strong>
        </p>
        <p>
          These Services do not address anyone under the age of 13. I do not
          knowingly collect personally identifiable information from children
          under 13. In the case I discover that a child under 13 has provided me
          with personal information, I immediately delete this from our servers.
          If you are a parent or guardian and you are aware that your child has
          provided us with personal information, please contact me so that I
          will be able to do necessary actions.
        </p>
        <p>
          <strong>Changes to This Privacy Policy</strong>
        </p>
        <p>
          I may update our Privacy Policy from time to time. Thus, you are
          advised to review this page periodically for any changes. I will
          notify you of any changes by posting the new Privacy Policy on this
          page.
        </p>
        <p>This policy is effective as of 2020-06-02</p>
        <p>
          <strong>Contact Us</strong>
        </p>
        <p>
          If you have any questions or suggestions about my Privacy Policy, do
          not hesitate to contact me at hugocarnicelli@gmail.com.
        </p>
      </Box>
    </Main>
  );
};

export default App;
