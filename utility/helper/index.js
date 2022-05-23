import { ethers } from "ethers";

export const isEmptyContract = (contract) => {
  return contract === "0x0000000000000000000000000000000000000000";
};

export const convertToEther = (value = "0") => {
  return ethers.utils.formatEther(value);
};
