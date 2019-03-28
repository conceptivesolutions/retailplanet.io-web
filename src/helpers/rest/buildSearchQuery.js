export default (pQuery, pSort, pUser, pOffset, pLength) => {
  const query = encodeURIComponent(pQuery);
  const baseURL = pUser && pUser.tokens && pUser.tokens.accessToken ? '/api/search/user' : '/api/search';
  let url = `${baseURL}?query=${query}`;
  if (pSort)
    url = `${url}&sort=${pSort}`;
  if (pOffset)
    url = `${url}&offset=${pOffset}`;
  if (pLength)
    url = `${url}&length=${pLength}`;
  return url;
};
