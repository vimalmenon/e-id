import { AppLayout } from "../Layout";
import { metadata } from "../data";
import Box from "@mui/material/Box";

const Search = () => {
  return (
    <AppLayout metadata={metadata.Search}>
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <div>This is Search</div>
      </Box>
    </AppLayout>
  );
};

export default Search;
