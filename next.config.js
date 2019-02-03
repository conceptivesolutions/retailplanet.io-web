const withSass = require('@zeit/next-sass');
module.exports = withSass({
                            publicRuntimeConfig: {
                              keycloak_realm: process.env.OAUTH_REALM,
                              keycloak_url: process.env.OAUTH_URL,
                              logout_redirect_url: process.env.LOGOUT_REDIRECT_URL
                            }
                          });