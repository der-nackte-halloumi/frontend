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
  margin: 0 auto 32px;
  text-align: center;
`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>unpackaged.world</title>
        {/* TODO: get proper favicon */}
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="unpackaged.world helps you finding shops for buying unpackaged products."
        />
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="unpackaged,unverpackt" />
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
