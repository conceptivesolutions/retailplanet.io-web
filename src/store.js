/* import/prefer-default-export */
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createRouterMiddleware, initialRouterState, routerReducer } from 'connected-next-router';
import thunkMiddleware from 'redux-thunk';
import searchReducer from './reducers/searchReducer';
import sessionReducer from './reducers/sessionReducer';

const routerMiddleware = createRouterMiddleware();

export function makeStore(initialState = {}, options) {
  if (options.asPath) {
    // eslint-disable-next-line no-param-reassign
    initialState.router = initialRouterState(options.asPath);
  }

  return createStore(
    combineReducers({
      search: searchReducer,
      session: sessionReducer,
      router: routerReducer,
    }),
    initialState,
    composeWithDevTools(applyMiddleware(routerMiddleware, thunkMiddleware)),
  );
}
