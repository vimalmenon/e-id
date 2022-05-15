import { AppLayout } from "../Layout";
import { metadata } from "../data";
import Box from "@mui/material/Box";
import { EmployeeRegister } from "../components";

const RegisterEmployee = () => {
  return (
    <AppLayout metadata={metadata.RegisterEmployee}>
      <Box
        sx={{ display: "flex", margin: 5, flex: 1, justifyContent: "center" }}
      >
        <EmployeeRegister />
      </Box>
    </AppLayout>
  );
};

export default RegisterEmployee;
