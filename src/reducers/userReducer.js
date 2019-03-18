const initSearchState = {};

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
      return {
        ...state, ...action.payload,
      };
    default:
      return state;
  }
};
