import React from "react";
import Box from "@mui/material/Box";
import { useAppHelper, useContext } from "../";
import { RegisterDialog } from "../../common";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { QRCodeCanvas } from "qrcode.react";
import IconButton from "@mui/material/IconButton";
import CircleIcon from "@mui/icons-material/Circle";

export const EmployeeDetail = () => {
  const { contract, address, employee } = useContext();
  const { getEmployeeDetail } = useAppHelper();
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (contract && address) {
      getEmployeeDetail();
    }
  }, [contract, address]);
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
                  <CircleIcon sx={{ color: "green" }} />
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
                  imageSettings={{
                    width: "500",
                    height: "300",
                  }}
                  style={{ width: "250px", height: "230px" }}
                />
              </Box>
              <Box sx={{ flex: 2, display: "flex", justifyContent: "center" }}>
                {employee.employeeAddress}
              </Box>
            </CardContent>
          </Card>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flex: 1 }}>Property</Box>
            <Box sx={{ flex: 2 }}>Value</Box>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flex: 1 }}>Employee Address</Box>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flex: 1 }}>ID</Box>
            <Box sx={{ flex: 2 }}></Box>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flex: 1 }}>Name</Box>
            <Box sx={{ flex: 2 }}></Box>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flex: 1 }}>Is Hirable</Box>
            <Box sx={{ flex: 2 }}>{employee.isHirable ? "True" : "False"}</Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};
