import React from "react";
import { ethers } from "ethers";

export const contractAddress = "0x9A676e781A523b5d0C0e43731313A708CB607508";

export const contractTestingAddress =
  "0x0B306BF915C4d645ff596e518fAf3F9669b97016";

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
    return new Promise((resolve, reject) => {
      if (id && name && contract && isLoggedIn) {
        if (employeeAddress) {
          signedContract
            .registerEmployeeWithPayee(id, name, employeeAddress)
            .then((result) => {
              console.log(result);
              result.wait().then((data) => {
                resolve(data);
              });
            })
            .catch((error) => {
              reject("No value");
            });
        } else {
          signedContract
            .registerEmployee(id, name)
            .then((result) => {
              result.wait().then((value) => {
                console.log(result, value);
              });
            })
            .catch((data) => {
              console.log(data);
              reject("No value");
            });
        }
      }
    });
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
  const onEmployeeDetail = () => {

  };
  const onContractDetail = () => {

  };
  return {
    onEmployerRegister,
    onEmployeeRegister,
    onEmployeeRecruit,
    onEmployeeResign,
    metamaskLogin,
  };
};
