/**
 * This file returns a simple array of oAuth Provider objects for NextAuth.
 */

const keycloak_realm = process.env.OAUTH_REALM;
const keycloak_clientid = process.env.OAUTH_CLIENTID;
const keycloak_clientsecret = process.env.OAUTH_SECRET;
const keycloak_url = process.env.OAUTH_URL;

module.exports = () => {
  return [{
    providerName: 'Keycloak',
    Strategy: require("@exlinc/keycloak-passport"),
    strategyOptions: {
      host: keycloak_url,
      realm: keycloak_realm,
      clientID: keycloak_clientid,
      clientSecret: keycloak_clientsecret,
      authorizationURL: keycloak_url + "/auth/realms/" + keycloak_realm + "/protocol/openid-connect/auth",
      tokenURL: keycloak_url + "/auth/realms/" + keycloak_realm + "/protocol/openid-connect/token",
      userInfoURL: keycloak_url + "/auth/realms/" + keycloak_realm + "/protocol/openid-connect/userinfo"
    },
    providerOptions: {
      scope: ['profile', 'email']
    },
    getProfile(profile)
    {
      // Normalize profile into one with {id, name, email} keys
      return {
        id: profile.keycloakId,
        name: profile.fullName,
        email: profile.email
      }
    }
  }]
};