export default (pQuery, pSort, pAccessToken) => {
  const query = encodeURIComponent(pQuery);
  let url = `/api/search?query=${query}`;
  if (pSort) url = `${url}&sort=${pSort}`;
  if (pAccessToken) url = `${url}&dummy=false`;
  return url;
};
