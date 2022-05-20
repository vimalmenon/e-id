import React from "react";
import { ethers } from "ethers";

import { isEmptyContract } from "../../utility";

import { Context, contractAddress } from "./service";

import HiringApplication from "../../src/artifacts/contracts/HiringApplication.sol/HiringApplication.json";

export { useContext, useAppHelper } from "./service";

export const AppContext = ({ children }) => {
  const [provider, setProvider] = React.useState();
  const [contract, setContract] = React.useState();
  const [signedContact, setSignedContract] = React.useState();
  const [signer, setSigner] = React.useState();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [address, setAddress] = React.useState();
  const [accounts, setAccounts] = React.useState([]);
  const [employer, setEmployer] = React.useState();
  const [employee, setEmployee] = React.useState();
  const [logs, setLogs] = React.useState([]);
  const logsRef = React.useRef([]);
  const [contractDetail, setContractDetail] = React.useState();
  const [links, setLinks] = React.useState([
    {
      label: "Home",
      link: "/",
      show: true,
    },
    {
      label: "Company",
      link: "/company",
      show: false,
    },
    {
      label: "Employee",
      link: "employee",
      show: false,
    },
    {
      label: "Search",
      link: "/search",
      show: true,
    },
    {
      label: "Logs",
      link: "/logs",
      show: true,
    },
  ]);

  React.useEffect(() => {
    if (contract) {
      contract.on("AddEvent", (createdBy, createdAddress, msg) => {
        logsRef.current.unshift({
          createdBy,
          address: createdAddress,
          msg,
        });
      });
    }
  }, [contract]);
  setInterval(() => {
    if (logsRef.current.length !== logs.length) {
      setLogs(logsRef.current);
    }
  }, 1000);
  React.useEffect(() => {
    if (typeof window.ethereum !== undefined) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setContract(
        new ethers.Contract(contractAddress, HiringApplication.abi, provider)
      );
      const signer = provider.getSigner();
      const signedContract = new ethers.Contract(
        contractAddress,
        HiringApplication.abi,
        signer
      );
      setSignedContract(signedContract);
      provider.listAccounts().then((accounts) => {
        setAccounts(accounts);
        setIsLoggedIn(accounts.length > 0);
      });
      setProvider(provider);
      setSigner(signer);
    }
  }, []);
  React.useEffect(() => {
    if (contract && signer && isLoggedIn) {
      signer.getAddress().then((address) => {
        setAddress(address);
      });
    }
  }, [contract, signer, isLoggedIn]);
  React.useEffect(() => {
    if (employer) {
      const newLinks = [...links];
      newLinks[1].show = true;
      setLinks(newLinks);
    }
  }, [employer]);
  React.useEffect(() => {
    if (employee) {
      const newLinks = [...links];
      newLinks[2].show = true;
      setLinks(newLinks);
    }
  }, [employee]);
  React.useEffect(() => {
    if (provider && contract) {
      contract.getContractDetail().then((data) => {
        setContractDetail(data);
      });
    }
  }, [provider, contract]);
  React.useEffect(() => {
    if (contract && address) {
      contract.getEmployerAddress(address).then((data) => {
        if (!isEmptyContract(data)) {
          contract.getEmployerDetails(data).then((detail) => {
            setEmployer(detail);
          });
        }
      });
      contract.getEmployeeAddress(address).then((data) => {
        if (!isEmptyContract(data)) {
          contract.getEmployeeDetails(data).then((detail) => {
            setEmployee(detail);
          });
        }
      });
    }
  }, [contract, address]);
  return (
    <Context.Provider
      value={{
        contractAddress,
        contractDetail,
        signedContact,
        isLoggedIn,
        contract,
        accounts,
        provider,
        employee,
        employer,
        address,
        signer,
        links,
        logs,
      }}
    >
      {children}
    </Context.Provider>
  );
};
