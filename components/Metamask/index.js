import React from "react";
import { useAppHelper } from "../AppContext";

export const Metamask = () => {
  const { metamaskLogin } = useAppHelper();
  return (
    <section>
      <button onClick={metamaskLogin}>Login to Metamask</button>
    </section>
  );
};
