import React from "react";
import Box from "@mui/material/Box";
import { useContext } from "../";
import { RegisterDialog, EmployeeTableCell } from "../../common";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { QRCodeCanvas } from "qrcode.react";
import IconButton from "@mui/material/IconButton";
import CircleIcon from "@mui/icons-material/Circle";
import Tooltip from "@mui/material/Tooltip";
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
              <Card>
                <CardHeader
                  title={employee.name}
                  subheader={employee.id}
                  action={
                    <IconButton aria-label="settings">
                      <Tooltip
                        title={employee.isHirable ? "Available" : "Working"}
                      >
                        <CircleIcon
                          sx={{
                            color: employee.isHirable ? "green" : "orange",
                          }}
                        />
                      </Tooltip>
                    </IconButton>
                  }
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: 3,
                    }}
                  >
                    <QRCodeCanvas
                      value={employee.employeeAddress}
                      size={500}
                      style={{ width: "210px", height: "230px" }}
                    />
                  </Box>
                  <Box
                    sx={{ flex: 2, display: "flex", justifyContent: "center" }}
                  >
                    {employee.employeeAddress}
                  </Box>
                </CardContent>
              </Card>
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
