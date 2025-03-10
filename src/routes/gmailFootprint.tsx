import { Box } from "@mui/material";
import GmailFootprint from "~/components/gmail-footprint/gmailFootprint";
import type { Route } from "./+types/gmailFootprint";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Men Sustainable Fashion Shops" }];
}
export default function Fashion() {
  return (
    <Box sx={{}}>
      <GmailFootprint />
    </Box>
  );
}
