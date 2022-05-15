import Box from "@mui/material/Box";
import React from "react";

import { AppLayout } from "../Layout";
import { metadata } from "../data";

import { useContext, EmployerDetail, EmployeeDetail } from "../components";

export default function Home() {
  const { login } = useContext();
  return (
    <AppLayout metadata={metadata.Home}>
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        {login === 0 ? <EmployeeDetail /> : <EmployerDetail />}
      </Box>
    </AppLayout>
  );
}
