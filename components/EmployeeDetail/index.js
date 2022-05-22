import React from "react";
import Box from "@mui/material/Box";
import { useContext } from "../";
import {
  RegisterDialog,
  EmployeeTableCell,
  QRCodeComponent,
} from "../../common";

import Grid from "@mui/material/Grid";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export const EmployeeDetail = () => {
  const { employee } = useContext();
  const [open, setOpen] = React.useState(false);
  const onClose = () => {
    setOpen(false);
  };
  const getSubTitle = (detail) => {
    if (detail.position) {
      return `${detail.id} (${detail.position})`;
    }
    return detail.id;
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1, padding: 2 }}>
      {open && <RegisterDialog open={open} onClose={onClose} page={1} />}
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
          Employee Detail
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {employee && (
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <QRCodeComponent
                title={employee.name}
                subTitle={getSubTitle(employee)}
                address={employee.employeeAddress}
                isHirable={employee.isHirable}
              />
            </Grid>
            <Grid item xs={9}>
              <Box sx={{ display: "flex" }}>
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
                      {employee.employementHistory.map((value, key) => {
                        return (
                          <EmployeeTableCell key={key} employement={value} />
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
};
