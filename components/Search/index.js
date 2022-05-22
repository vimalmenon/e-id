import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useRouter } from "next/router";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import CircleIcon from "@mui/icons-material/Circle";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { QRCodeCanvas } from "qrcode.react";

import { useContext } from "../";

import { EmployeeTableCell } from "../../common";

export const Search = () => {
  const [type, setType] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [detail, setDetail] = React.useState();
  const { push, query } = useRouter();
  const { contract } = useContext();

  const onInputChange = (event) => {
    if (event.target.name === "type") {
      setType(event.target.value);
    } else {
      setAddress(event.target.value);
    }
  };
  const onSearch = () => {
    push({
      path: "/search",
      query: {
        t: type,
        a: address,
      },
    });
  };
  React.useEffect(() => {
    const { t, a } = query;
    setDetail();
    setType(query.t || "");
    setAddress(query.a || "");
    if (t && a) {
      if (t === "en") {
        contract
          .getEmployeeDetails(a)
          .then((data) => {
            setDetail(data);
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        contract
          .getEmployerDetails(a)
          .then((data) => {
            setDetail(data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, [query]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        padding: 2,
        margin: 2,
      }}
    >
      <Box display={"flex"} sx={{ gap: 1, marginY: 2 }}>
        <Box display={"flex"} sx={{ flex: 1 }}>
          <TextField
            size="small"
            label="Address"
            fullWidth
            value={address}
            onChange={onInputChange}
          />
        </Box>
        <Box display={"flex"} sx={{ flex: "0 0 200px" }}>
          <FormControl fullWidth size="small">
            <InputLabel>Type</InputLabel>
            <Select
              value={type}
              label="Type"
              onChange={onInputChange}
              name="type"
            >
              <MenuItem value={"en"}>Employee</MenuItem>
              <MenuItem value={"co"}>Company</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box display={"flex"} sx={{ flex: "0 0 200px" }}>
          <Button variant="contained" fullWidth onClick={onSearch}>
            Search
          </Button>
        </Box>
      </Box>
      {type === "en" && detail && (
        <Box
          display={"flex"}
          sx={{ flex: 1, justifyContent: "center", marginY: 2, gap: 2 }}
        >
          <Box display={"flex"} sx={{ flex: "0 0 300px" }}>
            <Card>
              <CardHeader
                title={`${detail.name}`}
                subheader={`${detail.id} (${detail.position})`}
                action={
                  <IconButton aria-label="settings">
                    <Tooltip title={detail.isHirable ? "Available" : "Working"}>
                      <CircleIcon
                        sx={{
                          color: detail.isHirable ? "green" : "orange",
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
                    value={detail.employeeAddress}
                    size={500}
                    style={{ width: "210px", height: "230px" }}
                  />
                </Box>
                <Box
                  sx={{ flex: 2, display: "flex", justifyContent: "center" }}
                >
                  {detail.employeeAddress}
                </Box>
              </CardContent>
            </Card>
          </Box>
          <Box display={"flex"}>
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
                  {detail.employementHistory.map((value, key) => {
                    return <EmployeeTableCell key={key} employement={value} />;
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      )}
      {type === "co" && detail && (
        <Box
          display={"flex"}
          sx={{ flex: 1, justifyContent: "center", marginY: 2 }}
        >
          <Box display={"flex"} sx={{ flex: "0 0 300px" }}>
            <Badge color="secondary" badgeContent={detail.employees.length}>
              <Card>
                <CardHeader title={detail.name} subheader={detail.id} />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: 3,
                    }}
                  >
                    <QRCodeCanvas
                      value={detail.employerAddress}
                      size={500}
                      style={{ width: "210px", height: "230px" }}
                    />
                  </Box>
                  <Box
                    sx={{ flex: 2, display: "flex", justifyContent: "center" }}
                  >
                    {detail.employerAddress}
                  </Box>
                </CardContent>
              </Card>
            </Badge>
          </Box>
          <Box display={"flex"}></Box>
        </Box>
      )}
    </Box>
  );
};
