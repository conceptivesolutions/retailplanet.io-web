import _ from 'lodash';
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

/**
 * Returns true, if the given user is an admin user
 *
 * @param pUser User object from redux state
 * @returns {boolean} true if it is an admin user
 */
export function isAdmin(pUser) {
  if (!pUser || !pUser.info || !pUser.info.roles)
    return false;
  return _.indexOf(pUser.info.roles, 'admin') > -1;
}
