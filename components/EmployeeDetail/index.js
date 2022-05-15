import React from "react";
import Box from "@mui/material/Box";
import { useAppHelper } from "../";

export const EmployeeDetail = () => {
  const { onEmployerSwitch } = useAppHelper();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          justifyContent: "end",
          fontSize: "12px",
          margin: 1,
        }}
      >
        <span onClick={onEmployerSwitch}>Switch as Employer</span>
      </Box>
      <Box sx={{ display: "flex", flex: 1 }}>This is Employee Detail</Box>
    </Box>
  );
};
