import React from "react";
import { ethers } from "ethers";

export const contractAddress = "0x0165878A594ca255338adfa4d48449f69242Eb8F";

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
          .registerEmployeeWithPayee(id, name, employeeAddress)
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
