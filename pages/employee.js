import { AppLayout } from "../Layout";
import { metadata } from "../data";
import Box from "@mui/material/Box";
import { EmployeeDetail } from "../components";

const Employer = () => {
  return (
    <AppLayout metadata={metadata.Employee}>
      <Box
        sx={{ display: "flex", margin: 5, flex: 1, justifyContent: "center" }}
      >
        <EmployeeDetail />
      </Box>
    </AppLayout>
  );
};

export default Employer;
