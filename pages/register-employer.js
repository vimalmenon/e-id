import { AppLayout } from "../Layout";
import { metadata } from "../data";
import Box from "@mui/material/Box";
import { EmployerRegister } from "../components";

const RegisterEmployer = () => {
  return (
    <AppLayout metadata={metadata.RegisterEmployee}>
      <Box
        sx={{ display: "flex", margin: 5, flex: 1, justifyContent: "center" }}
      >
        <EmployerRegister />
      </Box>
    </AppLayout>
  );
};

export default RegisterEmployer;
