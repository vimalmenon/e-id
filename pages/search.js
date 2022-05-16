import { AppLayout } from "../Layout";
import { metadata } from "../data";
import Box from "@mui/material/Box";
import { Search as SearchComponent } from "../components";

const Search = () => {
  return (
    <AppLayout metadata={metadata.Search}>
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <SearchComponent />
      </Box>
    </AppLayout>
  );
};

export default Search;
