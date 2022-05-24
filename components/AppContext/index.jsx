import React from "react";

import { Context, useContextHelper } from "./service";

export { useContext, useAppHelper, useContractHelper } from "./service";

const NewAppContext = ({ children }) => {
  useContextHelper();
  return <React.Fragment>{children}</React.Fragment>;
};

export const AppContextWrapper = ({ children }) => {
  const [loading, setLoading] = React.useState(true);
  const [logs, setLogs] = React.useState([]);
  const [contractDetail, setContractDetail] = React.useState();
  const [address, setAddress] = React.useState();
  const [company, setCompany] = React.useState();
  const [employee, setEmployee] = React.useState();
  const [links, setLinks] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const logsRef = React.useRef([]);
  // React.useEffect(() => {
  //   if (contract) {
  //     contract.on("AddEvent", (createdBy, createdAddress, msg) => {
  //       logsRef.current.unshift({
  //         createdBy,
  //         address: createdAddress,
  //         msg,
  //       });
  //     });
  //   }
  // }, [contract]);
  // setInterval(() => {
  //   if (logsRef.current.length !== logs.length) {
  //     setLogs(logsRef.current);
  //   }
  // }, 1000);
  return (
    <Context.Provider
      value={{
        setContractDetail,
        contractDetail,
        setIsLoggedIn,
        setEmployee,
        isLoggedIn,
        setCompany,
        setLoading,
        setAddress,
        employee,
        setLinks,
        company,
        loading,
        setLogs,
        address,
        links,
        logs,
      }}
    >
      <NewAppContext>{children}</NewAppContext>
    </Context.Provider>
  );
};
