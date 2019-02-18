export default (pQuery, pSort) => {
  const query = encodeURIComponent(pQuery);
  let url = `/api/search?query=${query}`;
  if (pSort) url = `${url}&sort=${pSort}`;
  return url;
};
