import React from "react";
import { ethers } from "ethers";

export const contractAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

export const Context = React.createContext({
  contractAddress,
});

export const useContext = () => React.useContext(Context);

export const useAppHelper = () => {
  const { signedContract, isLoggedIn, contract, provider, employer } =
    useContext();

  const onEmployerRegister = (id, name) => {
    if (id && name && contract && isLoggedIn) {
      const options = { value: ethers.utils.parseEther("5.0") };
      signedContract.registerEmployer(id, name, options).then((result) => {
        console.log(result);
      });
    }
  };
  const onEmployeeRegister = (id, name, employeeAddress) => {
    if (id && name && contract && isLoggedIn) {
      if (employeeAddress) {
        signedContract
          .registerEmployeeWithPayee(id, name, employeeAddress, options)
          .then((result) => {
            console.log(result);
          });
      } else {
        signedContract.registerEmployee(id, name).then((result) => {
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
    signedContract
      .relieveEmployee(employerAddress, employeeAddress)
      .then((data) => {
        console.log(data);
      });
  };
  const onEmployeeRecruit = (employeeAddress, position) => {
    signedContract.recruitEmployee(
      employer.employerAddress,
      employeeAddress,
      position
    );
  };
  return {
    onEmployerRegister,
    onEmployeeRegister,
    onEmployeeRecruit,
    onEmployeeResign,
    metamaskLogin,
  };
};
