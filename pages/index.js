import Head from "next/head";
import { ethers } from "ethers";

import HiringApplication from "../src/artifacts/contracts/HiringApplication.sol/HiringApplication.json";
import React from "react";

import { EmployerRegister, EmployerDetail } from "../components";

export default function Home() {
  const [employer, setEmployer] = React.useState(null);
  const [address, setAddress] = React.useState();
  const [contactAddress] = React.useState(
    "0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0"
  );
  const login = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts");
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());
  };
  React.useEffect(() => {
    if (typeof window.ethereum !== undefined) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contact = new ethers.Contract(
        contactAddress,
        HiringApplication.abi,
        provider
      );
      const signer = provider.getSigner();
      signer.getAddress().then((address) => {
        contact.provider.getCode(address).then((data) => {
          console.log(data);
        });
        setAddress(address);
        // contact.checkingStructs().then((data) => {
        //   console.log(data);
        // });
        contact.getEmployerDetail(address).then((result) => {
          contact.getEmployerDetails(result).then((data) => {
            console.log(data.name, data.employeeCount.toNumber(), data);
          })
          console.log(result)
          setEmployer(result);
        });
      });
    }
  }, []);
  const onRegisterSave = async (value) => {
    if (typeof window.ethereum !== undefined) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contact = new ethers.Contract(
        contactAddress,
        HiringApplication.abi,
        signer
      );
      contact.registerEmployer(value).then((result) => {
        setEmployer(result);
      });
    }
  };
  return (
    <div>
      <Head>
        <title>E ID Application</title>
        <meta name="description" content="Application for E ID" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {!address && <button onClick={login}>Login</button>}
        {employer === "0x0000000000000000000000000000000000000000" && (
          <button>Register</button>
        )}
      </div>
      {employer === "0x0000000000000000000000000000000000000000" && (
        <EmployerRegister onRegisterSave={onRegisterSave} />
      )}
      <EmployerDetail />
      <div>
        {address} {employer}
      </div>
    </div>
  );
}
