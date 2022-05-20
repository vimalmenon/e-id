import React from "react";

export const contractAddress = "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e";

export const Context = React.createContext({
  contractAddress,
});

export const useContext = () => React.useContext(Context);

export const useAppHelper = () => {
  const { signedContact, isLoggedIn, contract, provider } = useContext();
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
  const metamaskLogin = async () => {
    await provider.send("eth_requestAccounts");
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());
  };
  const onEmployeeResign = async () => {
    // console.log(signedContact.relieveEmployee())
  }
  return {
    onEmployerRegister,
    onEmployeeRegister,
    onEmployeeResign,
    metamaskLogin,
  };
};
