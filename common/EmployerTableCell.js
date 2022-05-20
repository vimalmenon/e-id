import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { useContext, useAppHelper } from "../components";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import React from "react";

export const EmployerTableCell = ({ employee, employerAddress }) => {
  const { contract } = useContext();
  const { onEmployeeResign } = useAppHelper();
  const [employeeDetail, setEmployee] = React.useState({});
  React.useEffect(() => {
    contract.getEmployeeDetails(employee).then((data) => {
      setEmployee(data);
    });
  }, []);

  return (
    <TableRow>
      <TableCell>{employeeDetail.id}</TableCell>
      <TableCell>{employeeDetail.name}</TableCell>
      <TableCell>{employee}</TableCell>
      <TableCell>{employeeDetail.position}</TableCell>
      <TableCell align="right">
        <FileDownloadIcon
          onClick={() => onEmployeeResign(employerAddress, employee)}
        />
      </TableCell>
    </TableRow>
  );
};
