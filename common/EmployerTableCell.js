import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { useContext } from "../components";
import React from "react";

export const EmployerTableCell = ({ employee }) => {
  const { contract } = useContext();
  const [employeeDetail, setEmployee] = React.useState({});
  React.useEffect(() => {
    contract.getEmployeeDetails(employee).then((data) => {
      setEmployee(data);
    });
  }, []);
  console.log(employeeDetail);
  return (
    <TableRow>
      <TableCell>{employeeDetail.id}</TableCell>
      <TableCell>{employeeDetail.name}</TableCell>
      <TableCell>{employee}</TableCell>
      <TableCell>{employee}</TableCell>
    </TableRow>
  );
};
