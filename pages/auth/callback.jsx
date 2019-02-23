import React from 'react';
import { CallbackComponent } from 'redux-oidc';
import Router from 'next/router';
import userManager from '../../src/helpers/auth/userManager';
import css from './callback.scss';
import LoadingIndicator from '../../src/components/loading/LoadingIndicator';

// noinspection JSUnusedGlobalSymbols
export default () => (
  <CallbackComponent
    userManager={userManager}
    successCallback={() => {
      Router.push('/');
    }}
    errorCallback={(error) => {
      console.error(error);
      Router.push('/');
    }}
  >
    <div className={css.circleLoader}>
      <LoadingIndicator />
      <noscript>Loading session...</noscript>
    </div>
  </CallbackComponent>
);
