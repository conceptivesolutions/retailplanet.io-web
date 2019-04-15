export default (pQuery, pSort, pUser, pOffset, pLength, pFilters) => {
  const query = encodeURIComponent(pQuery);
  let url = `/api/search?query=${query}`;
  if (pSort)
    url = `${url}&sort=${pSort}`;
  if (pOffset)
    url = `${url}&offset=${pOffset}`;
  if (pLength)
    url = `${url}&length=${pLength}`;
  if (pFilters)
    url = `${url}&filter=${JSON.stringify(pFilters)}`;
  return url;
};
