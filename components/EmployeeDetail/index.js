import React from "react";
import Box from "@mui/material/Box";
import { useContext } from "../";
import { RegisterDialog } from "../../common";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { QRCodeCanvas } from "qrcode.react";
import IconButton from "@mui/material/IconButton";
import CircleIcon from "@mui/icons-material/Circle";
import Tooltip from "@mui/material/Tooltip";

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
        <Box
          component={"span"}
          sx={{
            display: "flex",
            fontSize: "12px",
            alignItems: "center",
          }}
        ></Box>
      </Box>
      {employee && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <Card sx={{ maxWidth: 500 }}>
            <CardHeader
              title={employee.name}
              subheader={employee.id}
              action={
                <IconButton aria-label="settings">
                  <Tooltip title={employee.isHirable ? "Available" : "Working"}>
                    <CircleIcon
                      sx={{ color: employee.isHirable ? "green" : "orange" }}
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
                  value="0x6DDFF2dF38D87DC8CCDfCFCDFDb3608bc296eD60"
                  size={500}
                  style={{ width: "210px", height: "230px" }}
                />
              </Box>
              <Box sx={{ flex: 2, display: "flex", justifyContent: "center" }}>
                {employee.employeeAddress}
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};
