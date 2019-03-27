export default (pQuery, pSort, pAccessToken, pOffset, pLength) => {
  const query = encodeURIComponent(pQuery);
  let url = `/api/search?query=${query}`;
  if (pSort)
    url = `${url}&sort=${pSort}`;
  if (pAccessToken)
    url = `${url}&dummy=false`;
  if (pOffset)
    url = `${url}&offset=${pOffset}`;
  if (pLength)
    url = `${url}&length=${pLength}`;
  return url;
};
