import getConfig from 'next/config';

/**
 * Adds the Authorization-Header to a fetch request
 *
 * @param pURL URL to fetch from
 * @param profile user-profile
 * @param tokens user-tokens
 * @param pObjects fetch-Objects
 */
export default function (pURL, { profile, tokens }, pObjects = {}) {
  const { headers = {}, ...objects } = pObjects;
  const { dev } = getConfig().publicRuntimeConfig;
  let url = pURL;

  if (profile && profile.id && dev)
    url = `${pURL + (pURL.indexOf('?') > -1 ? '&' : '?')}userid=${profile.id}`;

  if (tokens && tokens.accessToken)
    headers.Authorization = `Bearer ${tokens.accessToken}`;

  return fetch(url, {
    headers,
    ...objects,
  });
}
