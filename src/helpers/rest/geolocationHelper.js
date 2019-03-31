import AwesomeDebouncePromise from 'awesome-debounce-promise';
import getConfig from 'next/config';
import fetch from 'isomorphic-unfetch';

const { publicRuntimeConfig } = getConfig();
const countryFilter = 'country=de';
const postURL = `access_token=${publicRuntimeConfig.geolocation_token}&autocomplete=true&${countryFilter}`;

/**
 * Constructs an geolocation-Search-Result-Element from a REST-Result-Element
 *
 * @param json REST-Result-Element
 * @returns {Array} Result-Element
 */
const elementToResult = (json) => {
  if (!json.features)
    return [];

  return json.features.map((element) => {
    const value = element.id;
    const label = element.place_name;
    const location = element.center;
    return {
      value,
      label,
      location,
    };
  });
};

/**
 * Executes fuzzy search with MapBox
 *
 * @param text InputQuery
 * @returns {Promise<Array>|Promise<Array>} Resutling Promise
 */
const execSearch = (text) => {
  if (!text || text.length === 0)
    return Promise.resolve([]);

  // Execute
  return fetch(`/mapbox/geocoding/v5/mapbox.places/${encodeURIComponent(text)}.json?${postURL}`)
    .then(result => result.json())
    .then(elementToResult);
};

/**
 * Debounced SEARCH-Method
 */
const debouncer = AwesomeDebouncePromise(execSearch, 500);
export const search = input => debouncer(input);

const execReverse = (lat, lng) => fetch(`/mapbox/geocoding/v5/mapbox.places/${encodeURIComponent(`${lng},${lat}`)}.json?${postURL}`)
  .then(result => result.json())
  .then(elementToResult);

/**
 * Debounced REVERSE_SEARCH-Method
 */
const debouncerRev = AwesomeDebouncePromise(execReverse, 500);
export const searchRev = (lat, lng) => debouncerRev(lat, lng);
