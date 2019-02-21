import * as React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-next-router';
import withRedux from 'next-redux-wrapper';
import { makeStore } from '../src/store';

class MyApp extends App {
  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>retailplanet.io - buy from a local store</title>
          <link rel="apple-touch-icon" sizes="180x180" href="/static/favicons/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
          <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
          <link rel="shortcut icon" href="/static/favicons/favicon.ico" />
          <meta name="robots" content="noindex" />
          <meta name="apple-mobile-web-app-title" content="retailplanet.io" />
          <meta name="application-name" content="retailplanet.io" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="msapplication-TileImage" content="/static/favicons/mstile-144x144.png" />
          <meta name="msapplication-config" content="/static/favicons/browserconfig.xml" />
          <meta name="theme-color" content="#ffffff" />
          <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1" />
          <meta name="google-site-verification" content="YD3PhwzJ76avDVPzv0ds-WCowoldAqNC9XQ_ztkEkbI" />
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" />
          <link rel="stylesheet" href="/styles/global/static.css" />
        </Head>
        <Container>
          <Provider store={store}>
            <ConnectedRouter>
              <Component {...pageProps} />
            </ConnectedRouter>
          </Provider>
        </Container>
      </React.Fragment>
    );
  }
}

// noinspection JSUnusedGlobalSymbols
export default withRedux(makeStore)(MyApp);
