import * as React from "react";
import MuiSkeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

export const Skeleton = () => {
  return (
    <Box sx={{ display: "flex", flex: 1 }}>
      <Stack spacing={1} sx={{ flex: 1, gap: 2, margin: 3 }}>
        <MuiSkeleton variant="text" />
        <MuiSkeleton variant="circular" width={60} height={60} />
        <MuiSkeleton variant="rectangular" height={50} />
        <MuiSkeleton variant="rectangular" height={50} />
      </Stack>
    </Box>
  );
};
