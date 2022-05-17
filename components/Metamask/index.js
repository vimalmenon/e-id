import React from "react";
import { useAppHelper } from "../AppContext";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export const Metamask = () => {
  const { metamaskLogin } = useAppHelper();
  return (
    <Box
      component={"section"}
      sx={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        height: "88vh",
        alignItems: "center",
      }}
    >
      <Button variant="contained" onClick={metamaskLogin}>
        Login to Metamask
      </Button>
    </Box>
  );
};
