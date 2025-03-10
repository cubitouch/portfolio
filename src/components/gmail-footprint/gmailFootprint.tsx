import Co2Icon from "@mui/icons-material/Co2";
import GoogleIcon from "@mui/icons-material/Google";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { Slide } from "../home/slide";
import { NavBar } from "../navBar";
import { useGmailProgressiveCounts } from "./useCountGmailEmails";
import { useGmailAuth } from "./useGmailAuth";

const CLIENT_ID =
  "77093602474-gpn6s3rmm3nuk8e1oqvevuf5urv7cmgh.apps.googleusercontent.com";
const SCOPES = "https://www.googleapis.com/auth/gmail.readonly";

// https://greenoco.io/en/what-is-the-carbon-footprint-of-an-email/
// -> 1 email sent = 4g
// TODO: use storage duration (1 year = 10g)
function estimateEmailCO2Kg(emailCount: number, gramsPerEmail = 4): number {
  // gramsPerEmail: typical ~4g for a normal email
  return (emailCount * gramsPerEmail) / 1000;
}

const EmailCountCard = ({
  title,
  isLoading,
  count,
}: {
  title: string;
  isLoading: boolean;
  count: number;
}) => {
  return (
    <Card sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <CardHeader title={title} sx={{ flex: 1 }}></CardHeader>
      <CardContent
        sx={{ display: "flex", flexDirection: { xs: "row", sm: "column" } }}
      >
        <Box>
          {count.toLocaleString()} email(s){" "}
          {isLoading && <CircularProgress size={12} />}
        </Box>
        <Box sx={{ flex: 1 }} />
        {!isLoading && (
          <Box>
            <Chip
              color="primary"
              sx={{ mt: 1 }}
              avatar={
                <Avatar>
                  <Co2Icon />
                </Avatar>
              }
              label={`~${estimateEmailCO2Kg(count).toLocaleString()} kg`}
            ></Chip>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

const GmailFootprint = () => {
  const { accessToken, signIn, signOut } = useGmailAuth({
    clientId: CLIENT_ID,
    scope: SCOPES,
  });
  const { isLoading, counts, fetchCounts } =
    useGmailProgressiveCounts(accessToken);
  useEffect(() => {
    if (accessToken) {
      fetchCounts("newer_than:1y");
    }
  }, [accessToken, fetchCounts]);

  return (
    <>
      <NavBar withTabs={false} />
      <Slide first dark primary={"Gmail Carbon Footprint"}>
        <Box>
          {!accessToken && (
            <Button
              variant="contained"
              color="secondary"
              startIcon={<GoogleIcon />}
              onClick={() => signIn()}
            >
              Calculate my footprint*
            </Button>
          )}
          {!!accessToken && (
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<GoogleIcon />}
              onClick={() => signOut()}
            >
              Sign out
            </Button>
          )}
        </Box>
        {!!accessToken && (
          <>
            <Typography variant="h3">Since a year ago</Typography>
            <Box
              display="flex"
              gap={1}
              sx={{ flexDirection: { xs: "column", sm: "row" } }}
            >
              <EmailCountCard
                title="Total"
                count={counts?.total}
                isLoading={isLoading}
              />
              <EmailCountCard
                title="Primary"
                count={counts?.personal}
                isLoading={isLoading}
              />
              <EmailCountCard
                title="Promotions"
                count={counts?.promotions}
                isLoading={isLoading}
              />
              <EmailCountCard
                title="Social"
                count={counts?.social}
                isLoading={isLoading}
              />
              <EmailCountCard
                title="Updates"
                count={counts?.updates}
                isLoading={isLoading}
              />
              <EmailCountCard
                title="Forum"
                count={counts?.forums}
                isLoading={isLoading}
              />
            </Box>
            {!isLoading && (
              <>
                <Divider />
                <Typography variant="h3">So what?</Typography>
              </>
            )}
          </>
        )}
      </Slide>
    </>
  );
};

export default GmailFootprint;
