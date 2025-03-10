import { Box } from "@mui/material";
import GmailFootprint from "~/components/gmail-footprint/gmailFootprint";
import type { Route } from "./+types/gmailFootprint";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Gmail Carbon Footprint Calculator" }];
}
export default function Fashion() {
  return (
    <Box>
      <GmailFootprint />
    </Box>
  );
}
