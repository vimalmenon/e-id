import Box from "@mui/material/Box";
import React from "react";

import { AppLayout } from "../Layout";
import { metadata } from "../data";

import { useContext, EmployerDetail, EmployeeDetail } from "../components";

export default function Home() {
  const { login } = useContext();
  // const { onAppLoginEmployee, onAppLoginEmployer } = useAppHelper();
  // const [employer, setEmployer] = React.useState(null);
  // const [address, setAddress] = React.useState();
  // const [contactAddress] = React.useState(
  //   "0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0"
  // );
  // const login = async () => {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   await provider.send("eth_requestAccounts");
  //   const signer = provider.getSigner();
  //   console.log("Account:", await signer.getAddress());
  // };
  // React.useEffect(() => {
  //   if (typeof window.ethereum !== undefined) {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const contact = new ethers.Contract(
  //       contactAddress,
  //       HiringApplication.abi,
  //       provider
  //     );
  //     const signer = provider.getSigner();
  //     // signer.getAddress().then((address) => {
  //     //   setAddress(address);
  //     //   contact.getEmployerDetail(address).then((result) => {
  //     //     setEmployer(result);
  //     //   });
  //     // });
  //   }
  // }, []);
  // const onRegisterSave = async (value) => {
  //   if (typeof window.ethereum !== undefined) {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const signer = provider.getSigner();
  //     const contact = new ethers.Contract(
  //       contactAddress,
  //       HiringApplication.abi,
  //       signer
  //     );
  //     contact.registerEmployer(value).then((result) => {
  //       setEmployer(result);
  //     });
  //   }
  // };
  return (
    <AppLayout metadata={metadata.Home}>
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        {login === 0 ? <EmployeeDetail /> : <EmployerDetail />}
      </Box>
    </AppLayout>
  );
}
