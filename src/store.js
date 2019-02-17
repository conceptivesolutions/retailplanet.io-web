import { applyMiddleware, createStore } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

// Initial State
const initialState = {};

// export const actionTypes = {
//   TICK: 'TICK',
//   INCREMENT: 'INCREMENT',
//   DECREMENT: 'DECREMENT',
//   RESET: 'RESET',
// };

// Reducers
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    // case actionTypes.TICK:
    //   return Object.assign({}, state, {
    //     lastUpdate: action.ts,
    //     light: !!action.light,
    //   });
    default:
      return state;
  }
};

/**
 * Initialize Store
 *
 * @param state
 * @returns {Store<any, Action> & *}
 */
export function initializeStore(state = initialState) {
  return createStore(
    reducer,
    state,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  );
}
