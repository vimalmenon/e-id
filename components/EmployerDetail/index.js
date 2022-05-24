import React from "react";
import Box from "@mui/material/Box";
import { useContext, useContractHelper } from "../";
import {
  RegisterDialog,
  QRCodeComponent,
  EmployerTableCell,
  EmployeeTableCell,
} from "../../common";

import Grid from "@mui/material/Grid";

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
  const { company, contract } = useContext();
  const { onEmployeeRecruit } = useContractHelper();
  const [open, setOpen] = React.useState(false);
  const [enroll, setEnroll] = React.useState(false);
  const [employeeAddress, setEmployeeAddress] = React.useState("");
  const [position, setPosition] = React.useState("");
  const [detail, setDetail] = React.useState();
  const onClose = () => {
    setOpen(false);
  };
  const onChange = (e) => {
    setEmployeeAddress(e.target.value);
  };
  const onEmployeeSearch = () => {
    if (employeeAddress) {
      contract.getEmployeeDetails(employeeAddress).then((data) => {
        setDetail(data);
      });
    }
  };
  const getSubTitle = (detail) => {
    if (detail.position) {
      return `${detail.id} (${detail.position})`;
    }
    return detail.id;
  };
  const handleRecruit = () => {
    onEmployeeRecruit(employeeAddress, position).then(() => {
      setEnroll(false);
    });
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
            {!enroll ? "Recruit Employee" : "Show Employees"}
          </Button>
        </Box>
      </Box>
      {company && (
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <QRCodeComponent
                title={company.name}
                subTitle={company.id}
                address={company.employerAddress}
              />
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
                          <TableCell>Position</TableCell>
                          <TableCell align="right">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {company.employees.map((employee, key) => {
                          return (
                            <EmployerTableCell
                              employee={employee}
                              employerAddress={company.employerAddress}
                              key={key}
                            />
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              ) : (
                <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
                  <Box sx={{ display: "flex", gap: 2, flex: 1 }}>
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
                      <Button variant="contained" onClick={onEmployeeSearch}>
                        Search
                      </Button>
                    </Box>
                  </Box>
                  {detail && (
                    <Box
                      display={"flex"}
                      sx={{ flex: 1, flexDirection: "column" }}
                    >
                      <Box display={"flex"}>
                        <Box
                          display={"flex"}
                          sx={{
                            flex: 1,
                            justifyContent: "center",
                            marginY: 2,
                            gap: 2,
                          }}
                        >
                          <Box display={"flex"} sx={{ flex: "0 0 300px" }}>
                            <QRCodeComponent
                              title={detail.name}
                              subTitle={getSubTitle(detail)}
                              isHirable={detail.isHirable}
                              address={detail.employeeAddress}
                            />
                          </Box>
                          <Box display={"flex"} sx={{ flex: 1 }}>
                            <TableContainer component={Paper}>
                              <Table>
                                <TableHead>
                                  <TableRow>
                                    <TableCell>Employer</TableCell>
                                    <TableCell>Hiring</TableCell>
                                    <TableCell>Position</TableCell>
                                    <TableCell>Timestamp</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {detail.employementHistory.map(
                                    (value, key) => {
                                      return (
                                        <EmployeeTableCell
                                          key={key}
                                          employement={value}
                                        />
                                      );
                                    }
                                  )}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Box>
                        </Box>
                      </Box>
                      <Box display={"flex"} sx={{ flex: 1, gap: 2 }}>
                        <Box sx={{ display: "flex", flex: 1 }}>
                          <TextField
                            label="Position"
                            size="small"
                            fullWidth
                            value={position}
                            onChange={(e) => setPosition(e.target.value || "")}
                          />
                        </Box>
                        <Box sx={{ display: "flex", flex: "0 0 50px" }}>
                          <Button variant="contained" onClick={handleRecruit}>
                            Recruit
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};
