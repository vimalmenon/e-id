import Head from "next/head";
import {ethers, Signer} from "ethers";

import HiringApplication from "../src/artifacts/contracts/HiringApplication.sol/HiringApplication.json";

export default function Home() {
  async function requestAccount() {

  }
  async function getApplication () {
    if (typeof window.ethereum !== undefined) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contact = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", HiringApplication.abi, provider);
      // console.log(provider, new Signer().getAddress())
      const result  = await contact.getBalance();
      console.log(result.toNumber());
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
        <button>
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
