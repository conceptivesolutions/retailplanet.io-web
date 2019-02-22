import * as React from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { NextAuth } from 'next-auth/client';
import css from './callback.scss';
import LoadingIndicator from '../../src/components/loading/LoadingIndicator';

// noinspection JSUnusedGlobalSymbols
export default class extends React.Component {
  // noinspection JSUnusedGlobalSymbols
  static async getInitialProps({ req }) {
    return {
      session: await NextAuth.init({
        force: true,
        req,
      }),
    };
  }

  async componentDidMount() {
    // Neuen state fetchen
    await NextAuth.init({
      force: true,
    });

    // weiterleiten
    Router.push('/');
  }

  render() {
    return (
      <Link href="/">
        <a className={css.circleLoader}>
          <LoadingIndicator />
          <noscript>Click here to continue</noscript>
        </a>
      </Link>
    );
  }
}
