import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { QRCodeCanvas } from "qrcode.react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CircleIcon from "@mui/icons-material/Circle";
import Tooltip from "@mui/material/Tooltip";

export const QRCodeComponent = ({ title, subTitle, address, isHirable }) => {
  return (
    <Card>
      <CardHeader
        title={title}
        subheader={subTitle}
        action={
          isHirable && (
            <IconButton aria-label="settings">
              <Tooltip title={"Available"}>
                <CircleIcon
                  sx={{
                    color: "green",
                  }}
                />
              </Tooltip>
            </IconButton>
          )
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
            value={address}
            size={500}
            style={{ width: "210px", height: "230px" }}
          />
        </Box>
        <Box sx={{ flex: 2, display: "flex", justifyContent: "center" }}>
          {address}
        </Box>
      </CardContent>
    </Card>
  );
};
