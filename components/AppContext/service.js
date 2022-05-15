import React from "react";
import { isEmptyContract } from "../../utility";

export const contractAddress = "0x59b670e9fA9D0A427751Af201D676719a970857b";

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
  const onEmployeeRegister = (id, name, address) => {
    if (id && name && contract && isLoggedIn) {
      if (address) {
        signedContact
          .registerEmployeeWithPayee(id, name, address)
          .then((result) => {
            console.log(result);
          });
      } else {
        signedContact.registerEmployee(id, name).then((result) => {
          console.log(result);
        });
      }
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
  const getEmployeeDetail = async () => {    
    contract.getEmployeeAddress(address).then((data) => {
      if (!isEmptyContract(data)) {
        contract.getEmployeeDetails(data).then((detail) => {
          console.log(detail);
        });
      }
    });
  };
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
