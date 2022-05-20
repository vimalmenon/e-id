import React from "react";
import Box from "@mui/material/Box";
import { useAppHelper, useContext } from "../";
import { RegisterDialog, EmployerTableCell } from "../../common";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import { QRCodeCanvas } from "qrcode.react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export const EmployerDetail = () => {
  const { employer, signedContact } = useContext();
  const [open, setOpen] = React.useState(false);
  const [enroll, setEnroll] = React.useState(false);
  const [employeeAddress, setEmployeeAddress] = React.useState("");
  const onClose = () => {
    setOpen(false);
  };
  const onChange = (e) => {
    setEmployeeAddress(e.target.value);
  };
  const onEnroll = () => {
    signedContact.recruitEmployee(
      employer.employerAddress,
      employeeAddress,
      "Senior Software Engineer"
    );
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1, padding: 2 }}>
      {open && <RegisterDialog open={open} onClose={onClose} page={0} />}
      <Box
        sx={{
          display: "flex",
          flex: 1,
          justifyContent: "end",
          margin: 1,
        }}
      >
        <Box
          component={"span"}
          sx={{
            display: "flex",
            flex: 1,
            fontSize: "25px",
            justifyContent: "center",
            margin: 1,
            fontWeight: "bold",
          }}
        >
          Company Detail
        </Box>
        <Box
          component={"span"}
          sx={{
            display: "flex",
            fontSize: "12px",
            alignItems: "center",
          }}
        >
          <Button variant="contained" onClick={() => setEnroll(!enroll)}>
            {!enroll ? "Enroll Employee" : "Show Employees"}
          </Button>
        </Box>
      </Box>
      {employer && (
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <Card>
                <CardHeader title={employer.name} subheader={employer.id} />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: 3,
                    }}
                  >
                    <QRCodeCanvas
                      value={employer.employerAddress}
                      size={500}
                      style={{ width: "210px", height: "230px" }}
                    />
                  </Box>
                  <Box
                    sx={{ flex: 2, display: "flex", justifyContent: "center" }}
                  >
                    {employer.employerAddress}
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
          <Grid item xs={9}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {!enroll ? (
                <Box sx={{ display: "flex" }}>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Address</TableCell>
                          <TableCell align="right">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {employer.employees.map((employee, key) => {
                          return (
                            <EmployerTableCell employee={employee} key={key} />
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              ) : (
                <Box sx={{ display: "flex", flex: 1 }}>
                  <Box sx={{ display: "flex", flex: 1 }}>
                    <TextField
                      label="Employee address"
                      size="small"
                      fullWidth
                      value={employeeAddress}
                      onChange={onChange}
                    />
                  </Box>
                  <Box sx={{ display: "flex", flex: "0 0 50px" }}>
                    <Button variant="contained" onClick={onEnroll}>
                      Search
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};
