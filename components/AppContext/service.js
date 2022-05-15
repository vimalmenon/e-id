import React from "react";
import { isEmptyContract } from "../../utility";

export const contractAddress = "0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE";

export const Context = React.createContext({
  contractAddress,
});

export const useContext = () => React.useContext(Context);

export const useAppHelper = () => {
  const {
    contract,
    isLoggedIn,
    setLogin,
    provider,
    setEmployer,
    address,
    signedContact,
  } = useContext();
  const onEmployerRegister = (id, name) => {
    if (id && name && contract && isLoggedIn) {
      signedContact.registerEmployer(id, name).then((result) => {
        console.log(result);
      });
    }
  };
  const onEmployeeRegister = (id, name) => {
    if (id && name && contract && isLoggedIn) {
      signedContact.registerEmployee(id, name).then((result) => {
        console.log(result);
      });
    }
  };
  const onEmployeeSwitch = () => {
    setLogin(0);
  };
  const onEmployerSwitch = () => {
    setLogin(1);
  };
  const metamaskLogin = async () => {
    await provider.send("eth_requestAccounts");
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());
  };
  const getEmployerDetail = async () => {
    contract.getEmployerAddress(address).then((data) => {
      if (!isEmptyContract(data)) {
        contract.getEmployerDetails(data).then((detail) => {
          setEmployer(detail);
        });
      }
    });
  };
  const getEmployeeDetail = async () => {};
  return {
    onEmployerRegister,
    onEmployeeRegister,
    getEmployeeDetail,
    getEmployerDetail,
    onEmployeeSwitch,
    onEmployerSwitch,
    metamaskLogin,
  };
};
