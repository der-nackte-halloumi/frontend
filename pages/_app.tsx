import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";

export default function App({ Component, pageProps, router }: AppProps) {
  console.log(`Current path: ${router.pathname}`);

  return (
    <>
      <Head>
        <title>unpackaged.world</title>
        {/* TODO: get proper favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
