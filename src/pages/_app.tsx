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
        {/* TODO: move that over to the map, so only the map has it */}
        <link
          href="https://api.tiles.mapbox.com/mapbox-gl-js/v1.7.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
