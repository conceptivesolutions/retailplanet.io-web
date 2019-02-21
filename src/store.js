/* eslint-disable import/prefer-default-export,no-param-reassign */
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createRouterMiddleware, initialRouterState, routerReducer } from 'connected-next-router';
import { i18nState } from 'redux-i18n';
import thunkMiddleware from 'redux-thunk';
import searchReducer from './reducers/searchReducer';
import sessionReducer from './reducers/sessionReducer';

const routerMiddleware = createRouterMiddleware();

export function makeStore(initialState = {}, options) {
  if (options && options.asPath) initialState.router = initialRouterState(options.asPath);

  return createStore(
    combineReducers({
      search: searchReducer,
      session: sessionReducer,
      router: routerReducer,
      i18nState,
    }),
    initialState,
    composeWithDevTools(applyMiddleware(routerMiddleware, thunkMiddleware)),
  );
}
