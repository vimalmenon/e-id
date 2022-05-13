import React from "react";

import { useContract } from "../../utility";

export const EmployerDetail = ({ employerAddress }) => {
  const { contract } = useContract();
  const [employer, setEmployer] = React.useState();
  React.useEffect(() => {
    if (contract && employerAddress) {
      contract.getEmployerDetails(employerAddress).then((data) => {
        setEmployer(data);
        console.log(data.name, data.employeeCount.toNumber(), data);
      });
    }
  }, [contract, employerAddress]);
  if (employer) {
    return (
      <div>
        <div>
          <span>ID : </span>
          <span>{employerAddress}</span>
        </div>
        <div>
          <span>Company name : </span>
          <span>{employer.name}</span>
        </div>
        <div>
          <span>Employee Count : </span>
          <span>{employer.employeeCount.toNumber()}</span>
        </div>
        <div>
          <span>Payees : </span>
          <span>{employer.payees.join(" ,")}</span>
        </div>
      </div>
    );
  }
  return null;
};
