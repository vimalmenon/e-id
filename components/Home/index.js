import React from "react";
import Box from "@mui/material/Box";
import { useAppHelper, useContext } from "../";
import Button from "@mui/material/Button";

import { RegisterDialog } from "../../common";

export const Home = () => {
  const { contract, address, employee, employer } = useContext();
  const { getEmployeeDetail, getEmployerDetail } = useAppHelper();
  const [page, setPage] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (contract && address) {
      getEmployeeDetail();
      getEmployerDetail();
    }
  }, [contract, address]);
  const onEnrollEmployee = () => {
    setPage(1);
    setOpen(true);
  };
  const onRegisterCompany = () => {
    setPage(0);
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1, padding: 2 }}>
      {open && <RegisterDialog open={open} onClose={onClose} page={page} />}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", marginY: 1 }}>
          You are registered as : {employee && <span>Employee</span>}
          {employer && <span>Company</span>}
        </Box>
        <Box sx={{ display: "flex", marginY: 1 }}>
          <Button variant="contained" onClick={onRegisterCompany}>
            Register a company
          </Button>
        </Box>
        <Box sx={{ display: "flex", marginY: 1 }}>
          <Button variant="contained" onClick={onEnrollEmployee}>
            Enroll a employee
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
