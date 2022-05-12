import Head from "next/head";
import {ethers} from "ethers";

import HiringApplication from "../src/artifacts/contracts/HiringApplication.sol/HiringApplication.json";
import React from "react";

import {EmployerRegister, EmployerDetail } from "../components"

export default function Home() {
  const [employer, setEmployer] = React.useState(null);
  const [address, setAddress] = React.useState();
  const login = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts");
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());
  };
  React.useEffect(() => {
    if (typeof window.ethereum !== undefined) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contact = new ethers.Contract("0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9", HiringApplication.abi, provider);
      const signer = provider.getSigner();
      signer.getAddress().then((address) => {
        setAddress(address);
        contact.checkingStructs().then((data) => {
          console.log(data);
        })
        contact.getEmployerDetail(address).then((result) => {
          setEmployer(result)
        })
      });
    }
  }, []);
  const onRegisterSave = async (value) => {
    if (typeof window.ethereum !== undefined) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contact = new ethers.Contract("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", HiringApplication.abi, signer);
      contact.registerEmployer(value).then((result) => {
        setEmployer(result)
      })
    }
  }
  return (
    <div>
      <Head>
        <title>E ID Application</title>
        <meta name="description" content="Application for E ID" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {!address && <button onClick={login}>
          Login
        </button>}
        {employer === '0x0000000000000000000000000000000000000000' && <button>
          Register
        </button>}
      </div>
      {employer === '0x0000000000000000000000000000000000000000' && <EmployerRegister onRegisterSave={onRegisterSave}/> }
      <EmployerDetail />
      <div>
        {address} {employer}
      </div>
    </div>
  );
}
