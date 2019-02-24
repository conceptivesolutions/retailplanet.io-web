import buildSearchQuery from '../helpers/rest/buildSearchQuery';
import userManager from '../helpers/auth/userManager';

const initSearchState = {
  countries: [],
  loading: false,
  results: [],
  error: null,
};

export const searchActions = {
  SEARCH: 'SEARCH',
};

export function runSearch(query) {
  return {
    type: searchActions.SEARCH,
    payload: userManager.getUser()
      .then(user => fetch(buildSearchQuery(query, null, user ? user.access_token : '')))
      .then(response => response.json())
      .then(json => json.elements.map(pElement => ({
        name: pElement.name,
        price: pElement.price,
        image: pElement.previews ? pElement.previews[0] : '',
        source: 'TESTMARKET',
        rating: 3.5,
        ratingCount: 42,
      }))),
  };
}

export default (state = initSearchState, action) => {
  switch (action.type) {
    case `${searchActions.SEARCH}_PENDING`:
      return Object.assign({}, state, {
        loading: true,
        results: [],
      });
    case `${searchActions.SEARCH}_FULFILLED`:
      return Object.assign({}, state, {
        loading: false,
        results: action.payload,
      });
    default:
      return state;
  }
};
