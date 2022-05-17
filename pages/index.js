import Box from "@mui/material/Box";
import React from "react";

import { AppLayout } from "../Layout";
import { metadata } from "../data";

import { Home as HomeComponent } from "../components";

export default function Home() {
  return (
    <AppLayout metadata={metadata.Home}>
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <HomeComponent />
      </Box>
    </AppLayout>
  );
}
