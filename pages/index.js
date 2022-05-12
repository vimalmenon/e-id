import Head from "next/head";
import {ethers} from "ethers";

import HiringApplication from "../src/artifacts/contracts/HiringApplication.sol/HiringApplication.json";
import React from "react";

export default function Home() {

  const login = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts");
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());
  }
  async function getApplication () {
    if (typeof window.ethereum !== undefined) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contact = new ethers.Contract("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", HiringApplication.abi, provider);
      const signer = provider.getSigner();
      const address  = await signer.getAddress();
      const result  = await contact.getEmployerDetail(address)
      // console.log(provider, new Signer().getAddress())
      // const result  = await contact.getBalance();
      console.log(result);
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
        <button onClick={login}>
          Login
        </button>
        <button>
          Register
        </button>
        <button onClick={() => getApplication()}>Button Clicked</button>
      </div>
    </div>
  );
}
