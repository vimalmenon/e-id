import { AppLayout } from "../Layout";
import { metadata } from "../data";
import Box from "@mui/material/Box";
import { Logs as LogsComponent } from "../components";

const Search = () => {
  return (
    <AppLayout metadata={metadata.Logs}>
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <LogsComponent />
      </Box>
    </AppLayout>
  );
};

export default Search;
