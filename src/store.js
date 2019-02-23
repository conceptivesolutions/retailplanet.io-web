/* eslint-disable import/prefer-default-export,no-param-reassign */
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createRouterMiddleware, initialRouterState, routerReducer } from 'connected-next-router';
import { i18nState } from 'redux-i18n';
import { loadUser, reducer as oidcReducer } from 'redux-oidc';
import thunkMiddleware from 'redux-thunk';
import promise from 'redux-promise-middleware';
import userManager from './helpers/auth/userManager';
import searchReducer from './reducers/searchReducer';

const routerMiddleware = createRouterMiddleware();

export function makeStore(initialState = {}, options) {
  if (options && options.asPath) initialState.router = initialRouterState(options.asPath);

  const store = createStore(
    combineReducers({
      search: searchReducer,
      router: routerReducer,
      i18nState,
      oidc: oidcReducer,
    }),
    initialState,
    composeWithDevTools(applyMiddleware(routerMiddleware, thunkMiddleware, promise)),
  );
  loadUser(store, userManager);
  return store;
}
