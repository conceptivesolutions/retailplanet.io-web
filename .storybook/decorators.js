import React from 'react';
import { makeStore } from '../src/store';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import promise from 'redux-promise-middleware';
import I18n from 'redux-i18n';
import translations from '../src/i18n/translations';

/**
 * Decorator for Storybook-Stories to use a new default store instance
 */
export const withReduxStore = (myStore) => (story) => (
  <Provider store={myStore ? configureStore([thunkMiddleware, promise])(myStore) : makeStore()}>
    {story()}
  </Provider>
);

/**
 * Decorator for Storybook-Stories to use I18N
 */
export const withI18N = story => (
  <I18n translations={translations} initialLang="en" fallbackLang="de">
    {story()}
  </I18n>
);
