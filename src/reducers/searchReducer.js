import buildSearchQuery from '../helpers/rest/buildSearchQuery';
import bearerFetch from '../auth/bearerFetch';

const initSearchState = {
  countries: [],
  loading: false,
  filters: {
    editing: null,
    pos: [],
    neg: [],
  },
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
  SET_FILTER: 'SET_FILTER',
  SET_EDITING: 'SET_EDITING',
};

function setQuery(query) {
  return {
    type: searchActions.SET_QUERY,
    payload: query,
  };
}

function executeSearch(query, page, user, filters) {
  return {
    type: searchActions.SEARCH,
    payload: bearerFetch(buildSearchQuery(query, null, user, page * 20, 20, filters), user)
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
 * - Retrieve User
 * - Start Search (-> Loading-Flag will be set)
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
    const { user, search: { filters: { pos, neg } } } = getState();

    if (query)
      dispatch(executeSearch(query, page, user, {
        pos, neg,
      }));
    else
      dispatch(clearSearch());
  };
}

/**
 * ReRuns the current search with the current query and filter
 *
 * @returns {Function}
 */
export function rerunSearch() {
  return (dispatch, getState) => {
    const { search: { results: { query } } } = getState();
    if (query)
      dispatch(runSearch(query, 0));
  };
}

/**
 * Adds the given filter to states filters
 *
 * @param positive true, if the filter should be added to positive list
 * @param filter filter-obj
 * @returns {{payload: *, type: string}}
 */
export function setFilter(positive, filter) {
  return {
    type: searchActions.SET_FILTER,
    payload: {
      isPositive: positive,
      filter,
    },
  };
}

/**
 * Sets the edit-attribute of a filter, to mark them as "currently editing by user"
 *
 * @param filterName Name of the filter
 * @returns {{payload: *, type: string}}
 */
export function edit(filterName) {
  return {
    type: searchActions.SET_EDITING,
    payload: filterName,
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

    case searchActions.SET_FILTER: {
      const { isPositive, filter: { type, values } } = action.payload;
      const returnState = {
        ...state,
        filters: {
          editing: null,
          pos: state.filters.pos.filter(pValue => pValue.type !== type),
          neg: state.filters.neg.filter(pValue => pValue.type !== type),
        },
      };

      // Add filter to new target array
      const target = isPositive ? returnState.filters.pos : returnState.filters.neg;
      target.push({
        type,
        values,
      });
      return returnState;
    }

    case searchActions.SET_EDITING:
      return {
        ...state,
        filters: {
          ...state.filters,
          editing: action.payload,
        },
      };

    default:
      return state;
  }
};
