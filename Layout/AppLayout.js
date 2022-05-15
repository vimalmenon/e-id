import React from "react";
import Head from "next/head";

export const AppLayout = ({ children, metadata }) => {
  return (
    <main>
      <div>
        <Head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </div>
      {children}
    </main>
  );
};
