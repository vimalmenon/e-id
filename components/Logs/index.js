import React from "react";
import Box from "@mui/material/Box";
import { useContext } from "../";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export const Logs = () => {
  const { logs } = useContext();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1, padding: 2 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Created By</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Message</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((log, key) => {
              return (
                <TableRow key={key}>
                  <TableCell>{log.createdBy}</TableCell>
                  <TableCell>{log.address}</TableCell>
                  <TableCell>{log.msg}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
