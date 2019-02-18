const initSearchState = {
  _session: {},
  user: {},
};

export const sessionActions = {
  SET_SESSION: 'SET_SESSION',
};

export const setSession = session => ({
  type: sessionActions.SET_SESSION,
  payload: session,
});

export default (state = initSearchState, action) => {
  switch (action.type) {
    case sessionActions.SET_SESSION:
      return {
        ...state,
        _session: action.payload,
        user: action.payload.user,
      };
    default:
      return state;
  }
};
