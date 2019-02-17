/**
 * This file returns a simple array of oAuth Provider objects for NextAuth.
 */

const keycloakRealm = process.env.OAUTH_REALM;
const keycloakClientId = process.env.OAUTH_CLIENTID;
const keycloakClientSecret = process.env.OAUTH_SECRET;
const keycloakURL = process.env.OAUTH_URL;

module.exports = () => [
  {
    providerName: 'Keycloak',
    // eslint-disable-next-line global-require
    Strategy: require('@exlinc/keycloak-passport'),
    strategyOptions: {
      host: keycloakURL,
      realm: keycloakRealm,
      clientID: keycloakClientId,
      clientSecret: keycloakClientSecret,
      authorizationURL: `${keycloakURL}/auth/realms/${keycloakRealm}/protocol/openid-connect/auth`,
      tokenURL: `${keycloakURL}/auth/realms/${keycloakRealm}/protocol/openid-connect/token`,
      userInfoURL: `${keycloakURL}/auth/realms/${keycloakRealm}/protocol/openid-connect/userinfo`,
    },
    providerOptions: {
      scope: ['profile', 'email'],
    },
    getProfile(profile) {
      // Normalize profile into one with {id, name, email} keys
      return {
        id: profile.keycloakId,
        name: profile.fullName,
        email: profile.email,
      };
    },
  },
];
