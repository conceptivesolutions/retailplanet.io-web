/* eslint-disable import/prefer-default-export,no-param-reassign */
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createRouterMiddleware, initialRouterState, routerReducer } from 'connected-next-router';
import { i18nState } from 'redux-i18n';
import thunkMiddleware from 'redux-thunk';
import promise from 'redux-promise-middleware';
import searchReducer from './reducers/searchReducer';
import userReducer from './reducers/userReducer';

const routerMiddleware = createRouterMiddleware();

const composeEnhancers = composeWithDevTools({
  realtime: true,
  trace: true,
  traceLimit: 25,
});

export function makeStore(initialState = {}, options) {
  if (options && options.asPath) initialState.router = initialRouterState(options.asPath);

  return createStore(
    combineReducers({
      search: searchReducer,
      router: routerReducer,
      user: userReducer,
      i18nState,
    }),
    initialState,
    composeEnhancers(applyMiddleware(routerMiddleware, thunkMiddleware, promise)),
  );
}
