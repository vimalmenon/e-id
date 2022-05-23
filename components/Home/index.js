import React from "react";
import Box from "@mui/material/Box";
import { useAppHelper, useContext } from "../";
import Button from "@mui/material/Button";

import { RegisterDialog } from "../../common";

import { convertToEther } from "../../utility";

export const Home = () => {
  const { contractDetail } = useContext();
  const { onEmployeeRegister, onEmployerRegister } = useAppHelper();
  const [page, setPage] = React.useState(0);
  const [open, setOpen] = React.useState(false);
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
  const onSave = (value) => {
    if (page === 1) {
      onEmployeeRegister(value.id, value.name, value.address);
    } else {
      onEmployerRegister(value.id, value.name);
    }
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1, padding: 2 }}>
      {open && (
        <RegisterDialog
          open={open}
          onClose={onClose}
          page={page}
          onSave={onSave}
        />
      )}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", marginY: 1, gap: 2 }}>
          <Button variant="contained" onClick={onRegisterCompany}>
            Register a company
          </Button>
          <Button variant="contained" onClick={onEnrollEmployee}>
            Enroll a employee
          </Button>
          {/* <Button variant="contained" onClick={onTest}>
            Test
          </Button> */}
        </Box>
        {contractDetail && (
          <Box sx={{ display: "flex", flexDirection: "column", marginY: 1 }}>
            <Box sx={{ display: "flex", marginY: 1 }}>
              <Box sx={{ display: "flex", flex: 1 }}>Contract Address</Box>
              <Box sx={{ display: "flex", flex: 2 }}>
                {contractDetail.contractAddress}
              </Box>
            </Box>
            <Box sx={{ display: "flex", marginY: 1 }}>
              <Box sx={{ display: "flex", flex: 1 }}>Enrolled Employee</Box>
              <Box sx={{ display: "flex", flex: 2 }}>
                {contractDetail.employeeCount.toNumber()}
              </Box>
            </Box>
            <Box sx={{ display: "flex", marginY: 1 }}>
              <Box sx={{ display: "flex", flex: 1 }}>Registered Company</Box>
              <Box sx={{ display: "flex", flex: 2 }}>
                {contractDetail.employerCount.toNumber()}
              </Box>
            </Box>
            <Box sx={{ display: "flex", marginY: 1 }}>
              <Box sx={{ display: "flex", flex: 1 }}>Contract Balance</Box>
              <Box sx={{ display: "flex", flex: 2 }}>
                {convertToEther(contractDetail?.contractBalance?.toString())}{" "}
                ETH
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};
