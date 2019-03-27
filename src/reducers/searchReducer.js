import { push } from 'connected-next-router';
import buildSearchQuery from '../helpers/rest/buildSearchQuery';

const initSearchState = {
  countries: [],
  loading: false,
  results: {
    query: null,
    page: {
      current: -1,
      count: -1,
    },
    items: [],
  },
  error: null,
};

export const searchActions = {
  CLEAR: 'CLEAR',
  SEARCH: 'SEARCH',
  SET_QUERY: 'SET_QUERY',
};

function setQuery(query) {
  return {
    type: searchActions.SET_QUERY,
    payload: query,
  };
}

function executeSearch(query, page, token) {
  return {
    type: searchActions.SEARCH,
    payload: fetch(buildSearchQuery(query, null, token, page * 20, 20))
      .then(response => response.json())
      .then((json) => {
        const result = {};
        result.items = json.elements.map(pElement => ({
          name: pElement.name,
          price: pElement.price,
          image: pElement.previews ? pElement.previews[0] : '',
          source: 'TESTMARKET',
          rating: 3.5,
          ratingCount: 42,
        }));
        result.page = {
          count: Math.ceil(json.maxSize / json.length),
        };
        return result;
      }),
  };
}

function clearSearch() {
  return {
    type: searchActions.CLEAR,
  };
}

/**
 * RunSearch:
 * - Set Query to requested
 * - Retrieve User AccessToken
 * - Start Search (-> Loading-Flag will be set)
 * - Change URL in Browser to match new query / page
 *
 * @param query
 * @param page
 * @returns {Function}
 */
export function runSearch(query, page) {
  return (dispatch, getState) => {
    dispatch(setQuery({
      query,
      page,
    }));
    const { user } = getState();
    const token = user && user.tokens ? user.tokens.accessToken : null;

    if (query) {
      dispatch(executeSearch(query, page, token));
      dispatch(push({
        pathname: '/search',
        query: {
          query,
          page,
        },
      }));
    } else {
      dispatch(clearSearch());
      dispatch(push({
        pathname: '/',
      }));
    }
  };
}

export default (state = initSearchState, action) => {
  switch (action.type) {
    case searchActions.SET_QUERY:
      return {
        ...state,
        results: {
          ...state.results,
          query: action.payload.query,
          page: {
            current: action.payload.page,
          },
        },
      };
    case `${searchActions.SEARCH}_PENDING`:
      return {
        ...state,
        loading: true,
        results: {
          ...state.results,
          items: [],
        },
      };
    case `${searchActions.SEARCH}_FULFILLED`:
      return {
        ...state,
        loading: false,
        results: {
          ...state.results,
          items: action.payload.items,
          page: {
            current: state.results.page.current,
            count: action.payload.page.count,
          },
        },
      };
    default:
      return state;
  }
};
