import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { styled } from "linaria/react";
import { css } from "linaria";

import Footer from "../components/footer";
import "./main.css";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #fafafa;
`;
const footer = css`
  margin-top: auto;
`;
const Main = styled.main`
  width: 100%;
  margin: 0 auto;
  text-align: center;
`;

export default function App({ Component, pageProps }: AppProps) {
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
      <Wrapper>
        <Main>
          <Component {...pageProps} />
        </Main>
        <Footer className={footer}></Footer>
      </Wrapper>
    </>
  );
}
