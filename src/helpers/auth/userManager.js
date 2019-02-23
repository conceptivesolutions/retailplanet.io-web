import { createUserManager } from 'redux-oidc';
import { WebStorageStateStore } from 'oidc-client';
import LocalStorage from './LocalStorage';

const userManagerConfig = {
  authority: 'https://auth.retailplanet.io/auth/realms/retailplanet.io',
  client_id: 'sybaKpfJa5ZCNgl5bRqD.frontend',
  client_secret: 'b90dbaee-25e4-4470-94b9-f60dd3c3b14d',
  redirect_uri: 'http://localhost:3000/auth/callback',
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
