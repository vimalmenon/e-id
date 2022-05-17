import React from "react";
import Box from "@mui/material/Box";
import { useAppHelper, useContext } from "../";
import Button from "@mui/material/Button";

export const Home = () => {
  const { contract, address, employee, employer } = useContext();
  const { getEmployeeDetail, getEmployerDetail } = useAppHelper();
  React.useEffect(() => {
    if (contract && address) {
      getEmployeeDetail();
      getEmployerDetail();
    }
  }, [contract, address]);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1, padding: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", marginY: 1 }}>
          You are registered as : {employee && <span>Company</span>}
          {employer && <span>Employee</span>}
        </Box>
        <Box sx={{ display: "flex", marginY: 1 }}>
          <Button variant="contained">Register a company</Button>
        </Box>
        <Box sx={{ display: "flex", marginY: 1 }}>
          <Button variant="contained">Enroll a employee</Button>
        </Box>
      </Box>
    </Box>
  );
};
