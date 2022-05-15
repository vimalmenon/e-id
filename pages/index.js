import Head from "next/head";
import { ethers } from "ethers";

import HiringApplication from "../src/artifacts/contracts/HiringApplication.sol/HiringApplication.json";
import React from "react";

import Link from "next/link";

import { AppLayout } from "../Layout";

import {
  EmployerRegister,
  EmployerDetail,
  useContext,
  useAppHelper,
} from "../components";

export default function Home() {
  const { isLoggedIn, login: loginAs } = useContext();
  const { onAppLoginEmployee, onAppLoginEmployer } = useAppHelper();
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
      // signer.getAddress().then((address) => {
      //   setAddress(address);
      //   contact.getEmployerDetail(address).then((result) => {
      //     setEmployer(result);
      //   });
      // });
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
    <AppLayout>
      <div>
        <Head>
          <title>E ID Application</title>
          <meta name="description" content="Application for E ID" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div>
          {!isLoggedIn && <button onClick={login}>Login to Metamask</button>}
          {!loginAs && (
            <div>
              <div>
                <Link href="/">
                  <a>Home</a>
                </Link>
                <Link href="/register-employee">
                  <a>Register Employee</a>
                </Link>
                <Link href="/register-employer">
                  <a>Register Employer</a>
                </Link>
                <Link href="/search">
                  <a>Search</a>
                </Link>
                <button onClick={onAppLoginEmployee}>Login as Employee</button>
                <button onClick={onAppLoginEmployer}>Login as Employer</button>
              </div>
            </div>
          )}
          {employer === "0x0000000000000000000000000000000000000000" && (
            <button>Register</button>
          )}
        </div>
        {employer === "0x0000000000000000000000000000000000000000" && (
          <EmployerRegister onRegisterSave={onRegisterSave} />
        )}
        {employer !== "0x0000000000000000000000000000000000000000" && (
          <EmployerDetail employerAddress={employer} />
        )}
      </div>
    </AppLayout>
  );
}
