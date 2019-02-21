const withSass = require('@zeit/next-sass');

module.exports = withSass({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]___[hash:base64:5]',
  },
  publicRuntimeConfig: {
    keycloak_realm: process.env.OAUTH_REALM,
    keycloak_url: process.env.OAUTH_URL,
    logout_redirect_url: process.env.LOGOUT_REDIRECT_URL,
  },
});
