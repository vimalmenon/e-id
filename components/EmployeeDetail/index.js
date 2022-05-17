import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useAppHelper, useContext } from "../";
import { RegisterDialog } from "../../common";

export const EmployeeDetail = () => {
  const { contract, address, employee } = useContext();
  const { getEmployeeDetail } = useAppHelper();
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (contract && address) {
      getEmployeeDetail();
    }
  }, [contract, address]);
  const onClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1, padding: 2 }}>
      {open && <RegisterDialog open={open} onClose={onClose} page={1} />}
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
        >
          <Button variant="contained" onClick={() => setOpen(true)}>
            Add Employee
          </Button>
        </Box>
      </Box>
      {employee && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flex: 1 }}>Property</Box>
            <Box sx={{ flex: 2 }}>Value</Box>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flex: 1 }}>Employee Address</Box>
            <Box sx={{ flex: 2 }}>{employee.employeeAddress}</Box>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flex: 1 }}>ID</Box>
            <Box sx={{ flex: 2 }}>{employee.id}</Box>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flex: 1 }}>Name</Box>
            <Box sx={{ flex: 2 }}>{employee.name}</Box>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flex: 1 }}>Is Hirable</Box>
            <Box sx={{ flex: 2 }}>{employee.isHirable ? "True" : "False"}</Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};
