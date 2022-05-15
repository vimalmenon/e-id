import React from "react";
import { ethers } from "ethers";

import { Context, contractAddress } from "./service";
import HiringApplication from "../../src/artifacts/contracts/HiringApplication.sol/HiringApplication.json";

export { useContext, useAppHelper} from "./service";

export const AppContext = ({ children }) => {
  const [provider, setProvider] = React.useState();
  const [contract, setContract] = React.useState();
  const [signer, setSigner] = React.useState();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [address, setAddress] = React.useState();  
  const [login, setLogin] = React.useState(0);
  const [accounts, setAccounts] = React.useState([]);

  React.useEffect(() => {
    if (typeof window.ethereum !== undefined) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setContract(
        new ethers.Contract(contractAddress, HiringApplication.abi, provider)
      );
      const signer = provider.getSigner();
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
  return (
    <Context.Provider
      value={{
        contractAddress,
        isLoggedIn,
        contract,
        setLogin,
        accounts,
        provider,
        address,
        signer,
        login,
      }}
    >
      {children}
    </Context.Provider>
  );
};
