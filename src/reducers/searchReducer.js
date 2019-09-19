import _ from 'lodash';
import buildSearchQuery from '../helpers/rest/searchQueryHelper';
import bearerFetch from '../auth/bearerFetch';

export const searchSort = {
  PRICE_ASC: 'PRICE_ASC',
  PRICE_DESC: 'PRICE_DESC',
  RELEVANCE_DESC: 'RELEVANCE_DESC',
};

export const Availability = {
  AVAILABLE: 'AVAILABLE',
  ORDERABLE: 'ORDERABLE',
  UNAVAILABLE: 'NOT_AVAILABLE',
};

const initSearchState = {
  countries: [],
  loading: false,
  filters: {
    editing: null,
    pos: {
      availability: [Availability.AVAILABLE, Availability.ORDERABLE],
    },
    neg: {},
  },
  sorting: searchSort.RELEVANCE_DESC,
  results: {
    query: null,
    total: -1,
    filters: {},
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
  SET_SORTING: 'SET_SORTING',
};

function setQuery(query) {
  return {
    type: searchActions.SET_QUERY,
    payload: query,
  };
}

/**
 * Executes a given search and sets the result items in this store
 *
 * @param query Query as string
 * @param page page index
 * @param user current user
 * @param filters filter-object
 * @param sort sorting
 */
function executeSearch(query, page, user, filters, sort) {
  return {
    type: searchActions.SEARCH,
    payload: bearerFetch(buildSearchQuery(query, sort, (page - 1) * 20, 20, filters), user)
      .then(response => response.json())
      .then((json) => {
        const result = {};
        result.items = _.flatMap(json.elements, (pElement) => {
          const { availability } = pElement;
          if (!availability)
            return []; // todo

          return [{
            name: pElement.name,
            price: pElement.price,
            image: pElement.previews ? pElement.previews[0] : '', // eslint-disable-next-line no-underscore-dangle
            source: "__DUMMY__", // todo
            availability: "AVAILABLE",
            address: "__DUMMY__",
            location: "__DUMMY__",
            rating: 0,
            ratingCount: 0,
          }];
        });

        result.filters = json.filters;
        result.total = json.maxSize;
        result.page = {
          count: Math.ceil(json.maxSize / 20),
        };
        return result;
      }),
  };
}

/**
 * Clears the current search results
 */
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
 * @param page, starting on 1
 * @returns {Function}
 */
export function runSearch(query, page) {
  if (page <= 0)
    throw new Error('runSearch has to be used with an index greater than 0');

  return (dispatch, getState) => {
    dispatch(setQuery({
      query,
      page,
    }));
    const { user, search: { filters: { pos, neg }, sorting } } = getState();
    if (query)
      dispatch(executeSearch(query, page, user, {
        pos, neg,
      }, sorting));
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
      dispatch(runSearch(query, 1));
  };
}

/**
 * Sets the current sorting attribute
 *
 * @param sorting attribute
 */
export function setSorting(sorting) {
  return {
    type: searchActions.SET_SORTING,
    payload: sorting,
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
          total: action.payload.total,
          filters: action.payload.filters,
          page: {
            current: state.results.page.current,
            count: action.payload.page.count,
          },
        },
      };

    case searchActions.SET_SORTING:
      return {
        ...state,
        sorting: action.payload,
      };

    case searchActions.SET_FILTER: {
      const { isPositive, filter: { type, values } } = action.payload;
      const returnState = {
        ...state,
        filters: {
          ...state.filters,
          editing: null,
        },
      };

      // Remove filter with type
      _.unset(returnState, `filters.pos.${type}`);
      _.unset(returnState, `filters.neg.${type}`);

      // Add filter to new target array
      const target = isPositive ? returnState.filters.pos : returnState.filters.neg;
      target[type] = values;
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
