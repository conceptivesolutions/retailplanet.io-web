import * as React from 'react';
import App, {Container} from 'next/app';
import Head from 'next/head';
import '../static/styles/styles.scss'

//noinspection JSUnusedGlobalSymbols
export default class MyApp extends App
{
  render()
  {
    const {Component, pageProps} = this.props;

    return (
        <React.Fragment>
          <Head>
            <title>retailplanet.io</title>
            <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1"/>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"/>
          </Head>
          <Container>
            <Component {...pageProps} />
          </Container>
        </React.Fragment>
    );
  }
}