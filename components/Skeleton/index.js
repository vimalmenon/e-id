import * as React from "react";
import MuiSkeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export const Skeleton = () => {
  return (
    <Stack spacing={1}>
      <MuiSkeleton variant="text" />
      <MuiSkeleton variant="circular" width={40} height={40} />
      <MuiSkeleton variant="rectangular" width={210} height={118} />
    </Stack>
  );
};
