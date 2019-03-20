import buildSearchQuery from '../helpers/rest/buildSearchQuery';

const initSearchState = {
  countries: [],
  loading: false,
  results: {
    query: null,
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

function executeSearch(query, token) {
  return {
    type: searchActions.SEARCH,
    payload: fetch(buildSearchQuery(query, null, token))
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

function clearSearch() {
  return {
    type: searchActions.CLEAR,
  };
}

export function runSearch(query, token) {
  return (dispatch) => {
    dispatch(setQuery(query));
    if (query)
      dispatch(executeSearch(query, token));
    else
      dispatch(clearSearch());
  };
}

export default (state = initSearchState, action) => {
  switch (action.type) {
    case searchActions.SET_QUERY:
      return {
        ...state,
        results: {
          ...state.results, query: action.payload,
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
          items: action.payload,
        },
      };
    default:
      return state;
  }
};
