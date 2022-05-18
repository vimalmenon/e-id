import React from "react";
import Box from "@mui/material/Box";
import { useAppHelper, useContext } from "../";
import { RegisterDialog } from "../../common";

export const EmployerDetail = () => {
  const { getEmployerDetail, onEmployeeSwitch } = useAppHelper();
  const { employer, contract, address } = useContext();
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (contract && address) {
      getEmployerDetail();
    }
  }, [contract, address]);
  const onClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1, padding: 2 }}>
      {open && <RegisterDialog open={open} onClose={onClose} page={0} />}
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
          Company Detail
        </Box>
        <Box
          component={"span"}
          sx={{
            display: "flex",
            fontSize: "12px",
            alignItems: "center",
          }}
          onClick={onEmployeeSwitch}
        ></Box>
      </Box>
      {employer && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flex: 1 }}>Property</Box>
            <Box sx={{ flex: 2 }}>Value</Box>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flex: 1 }}>Employer Address</Box>
            <Box sx={{ flex: 2 }}>{employer.employerAddress}</Box>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flex: 1 }}>ID</Box>
            <Box sx={{ flex: 2 }}>{employer.id}</Box>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flex: 1 }}>Name</Box>
            <Box sx={{ flex: 2 }}>{employer.name}</Box>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flex: 1 }}>Employee Count</Box>
            <Box sx={{ flex: 2 }}>{employer.employeeCount?.toNumber()}</Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};
