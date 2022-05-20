import React from "react";

export const contractAddress = "0x3Aa5ebB10DC797CAC828524e59A333d0A371443c";

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
