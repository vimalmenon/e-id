import React from "react";
import Box from "@mui/material/Box";
import { useAppHelper, useContext } from "../";

import { useContract } from "../../utility";

export const EmployerDetail = () => {
  const { getEmployerDetail, onEmployeeSwitch } = useAppHelper();
  const { address, employer } = useContext();
  React.useEffect(() => {
    getEmployerDetail();
  }, []);
  console.log(employer);
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
        <span onClick={onEmployeeSwitch}>Switch as Employee</span>
      </Box>
      <Box sx={{ display: "flex", flex: 1 }}>This is Employer Detail</Box>
    </Box>
  );
};
