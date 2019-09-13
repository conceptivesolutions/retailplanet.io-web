/**
 * Constructs an URL to execute Search-Requests
 *
 * @param pQuery Current Query
 * @param pSort Sorting
 * @param pOffset Start index
 * @param pLength End index
 * @param pFilters Filters
 */
export default (pQuery, pSort, pOffset, pLength, pFilters) => {
  const query = encodeURIComponent(pQuery);
  let url = `/api/search?query=${query}`;
  if (pSort)
    url = `${url}&sort=${pSort}`;
  if (pOffset)
    url = `${url}&offset=${pOffset}`;
  if (pLength)
    url = `${url}&length=${pLength}`;
  //if (pFilters) // todo
  //  url = `${url}&filter=${JSON.stringify(pFilters)}`;
  return url;
};
