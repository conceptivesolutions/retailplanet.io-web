import * as React from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { NextAuth } from 'next-auth/client';
import css from './callback.scss';

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
          <svg className={css.circle} width="60" height="60" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="30" r="15" />
          </svg>
          <noscript>Click here to continue</noscript>
        </a>
      </Link>
    );
  }
}
