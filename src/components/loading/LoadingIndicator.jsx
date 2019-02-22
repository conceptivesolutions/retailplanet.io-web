import * as React from 'react';
import css from './LoadingIndicator.scss';

/**
 * Component, to show a loading indicator
 */
export default () => (
  <React.Fragment>
    <svg className={css.circle} width="60" height="60" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="30" r="15" />
    </svg>
    <span className={css.text}>Loading...</span>
  </React.Fragment>
);
