const initSearchState = {
  user: {},
};

const userActions = {
  UPDATE_USER: 'UPDATE_USER',
};

/**
 * Updates the current user to pUser
 */
export function updateUser(pUser) {
  return {
    type: userActions.UPDATE_USER,
    payload: pUser,
  };
}

export default (state = initSearchState, action) => {
  switch (action.type) {
    case userActions.UPDATE_USER:
      return Object.assign({}, state, {
        user: action.payload,
      });
    default:
      return state;
  }
};
