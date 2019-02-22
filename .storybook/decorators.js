import React from 'react';
import { makeStore } from '../src/store';
import { Provider } from 'react-redux';
import I18n from 'redux-i18n';
import translations from '../src/i18n/translations';

const store = makeStore();

/**
 * Decorator for Storybook-Stories to use a new default store instance
 */
export const withReduxStore = story => (
  <Provider store={store}>
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
