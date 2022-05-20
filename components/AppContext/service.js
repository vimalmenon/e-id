import React from "react";

export const contractAddress = "0xa85233C63b9Ee964Add6F2cffe00Fd84eb32338f";

export const Context = React.createContext({
  contractAddress,
});

export const useContext = () => React.useContext(Context);

export const useAppHelper = () => {
  const { signedContact, isLoggedIn, contract, provider, address } =
    useContext();

  const onEmployerRegister = (id, name) => {
    if (id && name && contract && isLoggedIn) {
      signedContact.registerEmployer(id, name).then((result) => {
        console.log(result);
      });
    }
  };
  const onEmployeeRegister = (id, name, employeeAddress) => {
    if (id && name && contract && isLoggedIn) {
      if (employeeAddress) {
        signedContact
          .registerEmployeeWithPayee(id, name, employeeAddress)
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
  const metamaskLogin = async () => {
    await provider.send("eth_requestAccounts");
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());
  };
  const onEmployeeResign = async (employerAddress, employeeAddress) => {
    signedContact
      .relieveEmployee(employerAddress, employeeAddress)
      .then((data) => {
        console.log(data);
      });
  };
  return {
    onEmployerRegister,
    onEmployeeRegister,
    onEmployeeResign,
    metamaskLogin,
  };
};
