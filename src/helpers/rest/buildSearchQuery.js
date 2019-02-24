export default (pQuery, pSort, pAccessToken) => {
  const query = encodeURIComponent(pQuery);
  let url = `/api/search?query=${query}`;
  if (pSort) url = `${url}&sort=${pSort}`;
  url = `${url}&token=${pAccessToken}`;
  return url;
};
