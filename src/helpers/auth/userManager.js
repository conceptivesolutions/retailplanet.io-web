import { createUserManager } from 'redux-oidc';
import { WebStorageStateStore } from 'oidc-client';
import getConfig from 'next/config';
import LocalStorage from './LocalStorage';

const { publicRuntimeConfig: pcr } = getConfig();

const userManagerConfig = {
  authority: `${pcr.auth_url}/auth/realms/${pcr.auth_realm}`,
  client_id: pcr.auth_clientid,
  client_secret: pcr.auth_secret,
  redirect_uri: `${pcr.auth_logout_redirect_url}/auth/callback`,
  post_logout_redirect_uri: `${pcr.auth_logout_redirect_url}`,
  response_type: 'code',
  scope: 'openid profile email',
  automaticSilentRenew: false,
  filterProtocolClaims: true,
  loadUserInfo: true,
  userStore: new WebStorageStateStore({
    store: new LocalStorage(),
  }),
};

const userManager = createUserManager(userManagerConfig);

export default userManager;
