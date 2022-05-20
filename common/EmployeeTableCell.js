import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useContext } from "../components";
import React from "react";

export const EmployeeTableCell = ({ employement }) => {
  const { contract } = useContext();
  const [employerName, setEmployerName] = React.useState();
  React.useEffect(() => {
    contract.getEmployerDetails(employement.employer).then((data) => {
      setEmployerName(data.name);
    });
  }, []);
  return (
    <TableRow>
      <TableCell>{employerName}</TableCell>
      <TableCell>
        {employement.hiringType == 0 ? "Joined" : "Resigned"}
      </TableCell>
      <TableCell>{employement.position}</TableCell>
      <TableCell>
        {new Date(employement.timestamp.toNumber() * 1000).toDateString()}
      </TableCell>
      <TableCell>
        <FileDownloadIcon />
      </TableCell>
    </TableRow>
  );
};
