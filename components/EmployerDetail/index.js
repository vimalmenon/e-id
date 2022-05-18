import React from "react";
import Box from "@mui/material/Box";
import { useAppHelper, useContext } from "../";
import { RegisterDialog } from "../../common";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { QRCodeCanvas } from "qrcode.react";

export const EmployerDetail = () => {
  const { onEmployeeSwitch } = useAppHelper();
  const { employer } = useContext();
  const [open, setOpen] = React.useState(false);
  const onClose = () => {
    setOpen(false);
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
          onClick={onEmployeeSwitch}
        ></Box>
      </Box>
      {employer && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <Card sx={{ maxWidth: 500 }}>
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
              <Box sx={{ flex: 2, display: "flex", justifyContent: "center" }}>
                {employer.employerAddress}
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};
