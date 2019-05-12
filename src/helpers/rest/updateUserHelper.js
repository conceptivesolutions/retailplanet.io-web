import bearerFetch from '../../auth/bearerFetch';

/**
 * Executes an update of the users avatar
 *
 * @param pUser User-Object in redux store
 * @param pBase64 base64 of the new avatar, or null
 */
export function updateAvatar(pUser, pBase64) {
  const url = '/api/profile';

  return bearerFetch(url, pUser, {
    method: 'PATCH',
    body: JSON.stringify({
      avatar: {
        base64: pBase64,
      },
    }),
  });
}
