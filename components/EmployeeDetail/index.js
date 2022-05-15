import React from "react";
import Box from "@mui/material/Box";
import { useAppHelper } from "../";

export const EmployeeDetail = () => {
  const { onEmployerSwitch, getEmployeeDetail } = useAppHelper();
  React.useEffect(() => {
    getEmployeeDetail();
  }, []);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1, padding: 2 }}>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          justifyContent: "end",
          margin: 1,
        }}
      >
        <Box
          component={"span"}
          sx={{
            display: "flex",
            flex: 1,
            fontSize: "25px",
            justifyContent: "center",
            margin: 1,
            fontWeight: "bold",
          }}
        >
          Employee Detail
        </Box>
        <Box
          component={"span"}
          sx={{
            display: "flex",
            fontSize: "12px",
            alignItems: "center",
          }}
          onClick={onEmployerSwitch}
        >
          Switch as Employer
        </Box>
      </Box>
      <Box sx={{ display: "flex", flex: 1 }}>This is Employee Detail</Box>
    </Box>
  );
};
