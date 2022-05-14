import React from "react";

export const contractAddress = "0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0";

export const Context = React.createContext({
  contractAddress,
});

export const loginAs = { employee: 1, employer: 2 };

export const useContext = () => React.useContext(Context);

export const useAppHelper = () => {
  const { contract, isLoggedIn, setLogin } = useContext();
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
  const onAppLoginEmployee = () => {
    setLogin(loginAs.employee);
  };
  const onAppLoginEmployer = () => {
    setLogin(loginAs.employer);
  };
  const onAppLogin = () => {
    setLogin();
  };
  return {
    onEmployerRegister,
    onEmployeeRegister,
    onAppLoginEmployee,
    onAppLoginEmployer,
    onAppLogin,
  };
};
