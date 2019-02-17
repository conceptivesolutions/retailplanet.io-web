const path = require('path');
const withSass = require('@zeit/next-sass');
const cssHelper = require('./src/helpers/CSSLoaderHelper');

module.exports = withSass(
  {
    cssModules: true,
    cssLoaderOptions: {
      getLocalIdent: (loaderContext, localIdentName, localName) => {
        if (!cssHelper.canBeTransformed(loaderContext.resourcePath.replace(/\\/g, '/'))) {
          return localName;
        }
        const fileName = path.basename(loaderContext.resourcePath);
        return `${fileName.replace(/\.[^/.]+$/, '')}___${localName}`;
      },
    },
    publicRuntimeConfig: {
      keycloak_realm: process.env.OAUTH_REALM,
      keycloak_url: process.env.OAUTH_URL,
      logout_redirect_url: process.env.LOGOUT_REDIRECT_URL,
    },
  },
);
