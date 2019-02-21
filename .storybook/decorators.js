import React from 'react';
import { makeStore } from '../src/store';
import { Provider } from 'react-redux';

const store = makeStore();

/**
 * Decorator for Storybook-Stories to use a new default store instance
 */
export const withReduxStore = story => (
  <Provider store={store}>
    {story()}
  </Provider>
);
