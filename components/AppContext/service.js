import React from "react";
import { isEmptyContract } from "../../utility";

export const contractAddress = "0x0B306BF915C4d645ff596e518fAf3F9669b97016";

export const Context = React.createContext({
  contractAddress,
});

export const useContext = () => React.useContext(Context);

export const useAppHelper = () => {
  const { contract, isLoggedIn, setLogin, provider, setEmployer, address, signedContact } =
    useContext();
  const onEmployerRegister = (id, name) => {
    if (name && contract && isLoggedIn) {
        signedContact.registerEmployer(id, name).then((result) => {
        console.log(result);
      });
    }
  };
  const onEmployeeRegister = (name) => {
    if (name && contract && isLoggedIn) {
      contract.registerEmployee(name).then((result) => {
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
