import React from "react";
import { useContract } from "..";

export const useEmployerDetail = () => {
  const { isLoggedIn, contract, signer, address } = useContract();
  const [employerDetail, setEmployerDetail] = React.useState();
  React.useEffect(() => {
    if (isLoggedIn && contract && signer && address) {
      contact.getEmployerDetail(address).then((result) => {
        setEmployerDetail(result);
      });
    }
  }, [isLoggedIn, contract, signer, address]);
  return {
    employerDetail,
  };
};
