import React from 'react';
import css from './callback.scss';
import LoadingIndicator from '../../src/components/loading/LoadingIndicator';

// noinspection JSUnusedGlobalSymbols
export default () => (
  <div className={css.circleLoader}>
    <LoadingIndicator />
    <noscript>Loading session...</noscript>
  </div>
);
