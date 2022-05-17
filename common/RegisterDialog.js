import React from "react";
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const pages = ["Register a company", "Register employee"];
export const RegisterDialog = ({ open, onClose, page = 0 }) => {
  const [selectedPage, setSelectedPage] = React.useState(page);
  const [input, setInput] = React.useState({
    id: "",
    name: "",
    address: "",
  });
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };
  const handleChange = (event, newValue) => {
    setSelectedPage(newValue);
  };
  const handleClose = () => {
    setInput({
      id: "",
      name: "",
      address: "",
    });
    onClose();
  };
  return (
    <Dialog
      fullWidth
      maxWidth={"md"}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
    >
      <DialogTitle>{pages[selectedPage]}</DialogTitle>
      <DialogContent>
        <Box>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={selectedPage}
              variant="fullWidth"
              onChange={handleChange}
            >
              {pages.map((value, key) => {
                return <Tab label={value} key={key} />;
              })}
            </Tabs>
          </Box>
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
            <Box sx={{ marginY: 2 }}>
              <TextField
                label="Address"
                variant="outlined"
                size="small"
                value={input.address}
                name="address"
                onChange={onInputChange}
                fullWidth
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Save</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};
