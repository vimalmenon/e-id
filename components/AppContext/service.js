import React from "react";
import { ethers } from "ethers";

import { isEmptyContract } from "../../utility";

import HiringApplication from "../../src/artifacts/contracts/HiringApplication.sol/HiringApplication.json";

export const contractAddress = "0x9A676e781A523b5d0C0e43731313A708CB607508";

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
  return {
    onEmployerRegister,
    onEmployeeRegister,
    onEmployeeRecruit,
    onEmployeeResign,
    metamaskLogin,
  };
};

export const useContractHelper = () => {
  const {
    signer,
    contract,
    setCompany,
    setAddress,
    setEmployee,
    setContractDetail,
  } = useContext();
  const getContractDetail = () => {
    contract.getContractDetail().then((data) => {
      setContractDetail(data);
    });
  };
  const getAddress = () => {
    signer.getAddress().then((address) => {
      setAddress(address);
    });
  };
  const getEmployerDetails = (address) => {
    contract.getEmployerAddress(address).then((data) => {
      if (!isEmptyContract(data)) {
        contract.getEmployerDetails(data).then((detail) => {
          setCompany(detail);
        });
      }
    });
  };
  const getEmployeeDetails = (address) => {
    contract.getEmployeeAddress(address).then((data) => {
      if (!isEmptyContract(data)) {
        contract.getEmployeeDetails(data).then((detail) => {
          setEmployee(detail);
        });
      }
    });
  };
  return {
    getEmployerDetails,
    getEmployeeDetails,
    getContractDetail,
    getAddress,
  };
};

export const useContextHelper = () => {
  const {
    signer,
    address,
    setLinks,
    contract,
    company,
    employee,
    setSigner,
    setLoading,
    isLoggedIn,
    setProvider,
    setContract,
    setIsLoggedIn,
    setSignedContract,
  } = useContext();
  const {
    getContractDetail,
    getAddress,
    getEmployeeDetails,
    getEmployerDetails,
  } = useContractHelper();
  React.useEffect(() => {
    if (typeof window.ethereum !== undefined) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        contractAddress,
        HiringApplication.abi,
        provider
      );
      const signer = provider.getSigner();
      const signedContract = new ethers.Contract(
        contractAddress,
        HiringApplication.abi,
        signer
      );
      provider.listAccounts().then((accounts) => {
        setLoading(false);
        setIsLoggedIn(accounts.length > 0);
      });

      // Setting the value
      setSigner(signer);
      setProvider(provider);
      setContract(contract);
      setSignedContract(signedContract);
    }
  }, []);
  React.useEffect(() => {
    if (contract && signer && isLoggedIn) {
      getAddress();
      getContractDetail();
    }
  }, [contract, signer, isLoggedIn]);
  React.useEffect(() => {
    setLinks([
      {
        label: "Home",
        link: "/",
        show: true,
      },
      {
        label: "Company",
        link: "/company",
        show: company ? true : false,
      },
      {
        label: "Employee",
        link: "employee",
        show: employee ? true : false,
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
  }, [employee, company]);
  React.useEffect(() => {
    if (contract && address) {
      getEmployeeDetails(address);
      getEmployerDetails(address);
    }
  }, [contract, address]);
};
