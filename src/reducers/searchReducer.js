import buildSearchQuery from '../helpers/rest/buildSearchQuery';

const initSearchState = {
  query: '',
  countries: [],
  loading: false,
  results: {},
  error: null,
};

export const searchActions = {
  SET_QUERY: 'SET_QUERY',
  RUN_SEARCH: 'RUN_SEARCH',
  SEARCH_STARTED: 'SEARCH_STARTED',
};

export const setQuery = query => ({
  type: searchActions.SET_QUERY,
  payload: query,
});

const searchStarted = () => ({
  type: searchActions.SEARCH_STARTED,
});

export const runSearch = () => (dispatch, getState) => {
  dispatch(searchStarted());
  fetch(buildSearchQuery(getState().search.query))
    .then(response => response.json())
    .then((json) => {
      const data = {
        items: json.elements.map(pElement => ({
          name: pElement.name,
          price: pElement.price,
          image: pElement.previews ? pElement.previews[0] : '',
          source: 'TESTMARKET',
          rating: 3.5,
          ratingCount: 42,
        })),
      };
      // todo
    });
};

export default (state = initSearchState, action) => {
  switch (action.type) {
    case searchActions.SET_QUERY:
      return Object.assign({}, state, {
        query: action.payload,
      });
    default:
      return state;
  }
};
