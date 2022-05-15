import React from "react";

export const contractAddress = "0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0";

export const Context = React.createContext({
  contractAddress,
});

export const useContext = () => React.useContext(Context);

export const useAppHelper = () => {
  const { contract, isLoggedIn, setLogin, provider, setEmployer, address } =
    useContext();
  const onEmployerRegister = (name) => {
    if (name && contract && isLoggedIn) {
      contact.registerEmployer(name).then((result) => {
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
    contract.getEmployerDetail(address).then((data) => {
      contract.getEmployerDetails(data).then((detail) => {
        setEmployer(detail);
      });
    });
  };
  return {
    onEmployerRegister,
    onEmployeeRegister,
    getEmployerDetail,
    onEmployeeSwitch,
    onEmployerSwitch,
    metamaskLogin,
  };
};
