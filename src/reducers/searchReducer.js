import buildSearchQuery from '../helpers/rest/buildSearchQuery';

const initSearchState = {
  query: '',
  countries: [],
  loading: false,
  results: [],
  error: null,
};

export const searchActions = {
  SET_QUERY: 'SET_QUERY',
  RUN_SEARCH: 'RUN_SEARCH',
  SEARCH_STARTED: 'SEARCH_STARTED',
  SEARCH_SUCCESS: 'SEARCH_SUCCESS',
  SEARCH_ERROR: 'SEARCH_ERROR',
};

export const setQuery = query => ({
  type: searchActions.SET_QUERY,
  payload: query,
});

const searchStarted = () => ({
  type: searchActions.SEARCH_STARTED,
});

const searchSuccess = results => ({
  type: searchActions.SEARCH_SUCCESS,
  payload: results,
});

const searchFailed = err => ({
  type: searchActions.SEARCH_ERROR,
  payload: err,
});

export const runSearch = query => (dispatch) => {
  dispatch(searchStarted());
  fetch(buildSearchQuery(query))
    .then(response => response.json())
    .then((json) => {
      const elements = json.elements.map(pElement => ({
        name: pElement.name,
        price: pElement.price,
        image: pElement.previews ? pElement.previews[0] : '',
        source: 'TESTMARKET',
        rating: 3.5,
        ratingCount: 42,
      }));
      dispatch(searchSuccess(elements));
    })
    .catch((err) => {
      dispatch(searchFailed(err));
    });
};

export default (state = initSearchState, action) => {
  switch (action.type) {
    case searchActions.SET_QUERY:
      return Object.assign({}, state, {
        query: action.payload,
      });
    case searchActions.SEARCH_STARTED:
      return Object.assign({}, state, {
        loading: true,
      });
    case searchActions.SEARCH_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        results: [
          ...action.payload,
        ],
      });
    default:
      return state;
  }
};
