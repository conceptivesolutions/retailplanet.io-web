export default (pQuery, pSort, pAccessToken) => {
  const query = encodeURIComponent(pQuery);
  const token = encodeURIComponent(pAccessToken);
  let url = `/api/search?query=${query}`;
  if (pSort) url = `${url}&sort=${pSort}`;
  if (pAccessToken) url = `${url}&token=${token}`;
  return url;
};
