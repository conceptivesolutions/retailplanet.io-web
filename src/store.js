/* eslint-disable import/prefer-default-export,no-param-reassign */
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { i18nState } from 'redux-i18n';
import thunkMiddleware from 'redux-thunk';
import promise from 'redux-promise-middleware';
import searchReducer from './reducers/searchReducer';
import userReducer from './reducers/userReducer';

const composeEnhancers = composeWithDevTools({
  realtime: true,
  trace: true,
  traceLimit: 25,
});

export function makeStore(initialState = {}) {
  return createStore(
    combineReducers({
      search: searchReducer,
      user: userReducer,
      i18nState,
    }),
    initialState,
    composeEnhancers(applyMiddleware(thunkMiddleware, promise)),
  );
}
