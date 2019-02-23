import { createUserManager } from 'redux-oidc';
import { InMemoryWebStorage, WebStorageStateStore } from 'oidc-client';

const userManagerConfig = {
  authority: 'https://auth.retailplanet.io/auth/realms/retailplanet.io',
  client_id: 'sybaKpfJa5ZCNgl5bRqD.frontend',
  client_secret: 'b90dbaee-25e4-4470-94b9-f60dd3c3b14d',
  redirect_uri: 'http://localhost:3000/auth/callback',
  response_type: 'code',
  scope: 'openid profile email',
  silent_redirect_uri: 'http://localhost:3000/silent_renew',
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true,
  userStore: new WebStorageStateStore({
    store: new InMemoryWebStorage(),
  }),
};

const userManager = createUserManager(userManagerConfig);

export default userManager;
