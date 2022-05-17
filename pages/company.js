import { AppLayout } from "../Layout";
import { metadata } from "../data";
import Box from "@mui/material/Box";
import { EmployerDetail } from "../components";

const Employee = () => {
  return (
    <AppLayout metadata={metadata.Company}>
      <Box
        sx={{ display: "flex", margin: 5, flex: 1, justifyContent: "center" }}
      >
        <EmployerDetail />
      </Box>
    </AppLayout>
  );
};

export default Employee;
