import _ from 'lodash';
import buildSearchQuery from '../helpers/rest/searchQueryHelper';
import bearerFetch from '../auth/bearerFetch';

export const searchSort = {
  PRICE_ASC: 'PRICE_ASC',
  PRICE_DESC: 'PRICE_DESC',
  RELEVANCE_DESC: 'RELEVANCE_DESC',
};

const initSearchState = {
  countries: [],
  loading: false,
  filters: {
    editing: null,
    pos: [],
    neg: [],
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
    payload: bearerFetch(buildSearchQuery(query, sort, page * 20, 20, filters), user)
      .then(response => response.json())
      .then((json) => {
        const result = {};
        result.items = _.flatMap(json.elements, (pElement) => {
          const { markets } = pElement;
          if (!markets)
            return [];

          return markets.map(pMarket => ({
            name: pElement.name,
            price: pElement.price,
            image: pElement.previews ? pElement.previews[0] : '', // eslint-disable-next-line no-underscore-dangle
            source: pMarket._type,
            availability: pMarket.availability,
            address: pMarket.address,
            location: pMarket.location,
            rating: 0,
            ratingCount: 0,
          }));
        });

        result.filters = json.filters;
        result.total = json.maxSize;
        result.page = {
          count: Math.ceil(json.maxSize / json.length),
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
 * @param page
 * @returns {Function}
 */
export function runSearch(query, page) {
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
      dispatch(runSearch(query, 0));
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
          filters: {},
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
