import React from "react";
import Box from "@mui/material/Box";
import { useAppHelper } from "../";

import { useContract } from "../../utility";
import { EmployeeRegister, EmployeeEnroll } from "../index";

export const EmployerDetail = ({ employerAddress }) => {
  const { contract } = useContract();
  const [employer, setEmployer] = React.useState();
  const [registerEmployee, setRegisterEmployee] = React.useState(false);
  const [enrollEmployee, setEnrollEmployee] = React.useState(false);
  React.useEffect(() => {
    if (contract && employerAddress) {
      contract.getEmployerDetails(employerAddress).then((data) => {
        setEmployer(data);
      });
    }
  }, [contract, employerAddress]);
  const { onEmployeeSwitch } = useAppHelper();
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
      <Box>This is Employer Detail</Box>
    </Box>
  );
};
