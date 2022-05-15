import React from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

export const EmployerRegister = ({ onRegisterSave }) => {
  const [input, setInput] = React.useState({
    id: "",
    name: "",
  });
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "800px",
        border: "1px solid rgba(25, 118, 210, 0.5)",
        padding: 5,
        borderRadius: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          marginY: 2,
          fontSize: "25px",
          justifyContent: "center",
        }}
      >
        Register Employer
      </Box>
      <Divider />
      <Box sx={{ marginY: 2 }}>
        <Box sx={{ marginY: 1 }}>
          <TextField
            label="ID"
            variant="outlined"
            size="small"
            value={input.id}
            name="id"
            onChange={onInputChange}
            fullWidth
          />
        </Box>
        <Box sx={{ marginY: 2 }}>
          <TextField
            label="Name"
            variant="outlined"
            size="small"
            value={input.name}
            name="name"
            onChange={onInputChange}
            fullWidth
          />
        </Box>
        <Box
          sx={{ marginY: 2, display: "flex", justifyContent: "space-between" }}
        >
          <Button variant="contained">Register</Button>
          <Button variant="outlined">Cancel</Button>
        </Box>
      </Box>
    </Box>
  );
};
