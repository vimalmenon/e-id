import React from "react";
import { ethers } from "ethers";

import { isEmptyContract } from "../../utility";

import HiringApplication from "../../src/artifacts/contracts/HiringApplication.sol/HiringApplication.json";

export const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

export const Context = React.createContext({
  contractAddress,
});

export const useContext = () => React.useContext(Context);

export const useAppHelper = () => {
  const { signedContract, isLoggedIn, contract, provider, employer } =
    useContext();

  const onEmployerRegister = async (id, name) => {
    if (id && name && contract && isLoggedIn) {
      const options = { value: ethers.utils.parseEther("5.0") };
      const result = await signedContract.registerEmployer(id, name, options);
      const wait = await result.wait();
      console.log("this is called", wait);
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
    company,
    contract,
    setLoading,
    setCompany,
    setAddress,
    setEmployee,
    signedContract,
    setContractDetail,
  } = useContext();
  const getContract = () => {
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
    return { provider, contract, signer, signedContract };
  };
  const getContractDetail = async () => {
    const { contract } = getContract();
    const contractDetail = await contract.getContractDetail();
    setContractDetail(contractDetail);
  };
  const getAddress = async () => {
    const { signer } = getContract();
    const address = await signer.getAddress();
    setAddress(address);
  };
  const getEmployerDetails = async (address) => {
    const { contract } = getContract();
    const employerAddress = await contract.getEmployerAddress(address);
    if (!isEmptyContract(employerAddress)) {
      const company = await contract.getEmployerDetails(employerAddress);
      setCompany(company);
    }
  };
  const getEmployeeDetails = async (address) => {
    const { contract } = getContract();
    const employeeAddress = await contract.getEmployeeAddress(address);
    if (!isEmptyContract(employeeAddress)) {
      const employee = await contract.getEmployeeDetails(employeeAddress);
      setEmployee(employee);
    }
  };
  const onEmployeeRecruit = (employeeAddress, position) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      signedContract
        .recruitEmployee(company.employerAddress, employeeAddress, position)
        .then((result) => {
          result.wait().then((data) => {
            console.log(data);
            getEmployerDetails(employeeAddress).then(() => {
              setLoading(false);
              resolve(data);
            });
          });
        });
    });
  };
  const onEmployerRegister = async (id, name) => {
    if (id && name && contract && isLoggedIn) {
      const options = { value: ethers.utils.parseEther("5.0") };
      const result = await signedContract.registerEmployer(id, name, options);
      const wait = await result.wait();
      console.log("this is called", wait);
    }
  };
  return {
    onEmployerRegister,
    getEmployerDetails,
    getEmployeeDetails,
    getContractDetail,
    onEmployeeRecruit,
    getContract,
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
    getAddress,
    getContract,
    getContractDetail,
    getEmployerDetails,
    getEmployeeDetails,
  } = useContractHelper();
  React.useEffect(() => {
    if (typeof window.ethereum !== undefined) {
      const { provider } = getContract();
      provider.listAccounts().then((accounts) => {
        setLoading(false);
        setIsLoggedIn(accounts.length > 0);
      });
    }
  }, []);
  React.useEffect(() => {
    if (isLoggedIn) {
      getAddress();
      getContractDetail();
    }
  }, [isLoggedIn]);
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
    if (address) {
      getEmployeeDetails(address);
      getEmployerDetails(address);
    }
  }, [contract, address]);
};
