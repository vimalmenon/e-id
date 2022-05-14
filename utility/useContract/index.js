import React from "react";
import { ethers } from "ethers";

import HiringApplication from "../../src/artifacts/contracts/HiringApplication.sol/HiringApplication.json";

export const useContract = () => {
  const [contractAddress] = React.useState(
    "0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0"
  );
  const [contract, setContract] = React.useState();
  const [signer, setSigner] = React.useState();
  const [address, setAddress] = React.useState();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    if (typeof window.ethereum !== undefined) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setContract(
        new ethers.Contract(contractAddress, HiringApplication.abi, provider)
      );
      setSigner(provider.getSigner());
      provider.listAccounts().then((accounts) => {
        setIsLoggedIn(accounts.length > 0);
      });
    }
  }, []);
  React.useEffect(() => {
    if (isLoggedIn && signer) {
      signer.getAddress().then((address) => {
        setAddress(address);
      });
    }
  }, [isLoggedIn, signer]);
  return {
    isLoggedIn,
    contract,
    address,
    signer,
  };
};
