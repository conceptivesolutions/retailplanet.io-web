const withSass = require('@zeit/next-sass');
const path = require('path');

module.exports = withSass({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]___[hash:base64:5]',
  },
  publicRuntimeConfig: {
    auth_realm: process.env.OAUTH_REALM,
    auth_url: process.env.OAUTH_URL,
    auth_clientid: process.env.OAUTH_CLIENTID,
    auth_secret: process.env.OAUTH_SECRET,
    auth_logout_redirect_url: process.env.LOGOUT_REDIRECT_URL,
    dev: process.env.NODE_ENV !== 'production',
    geolocationToken: process.env.MAPBOX_TOKEN,
    baseurl: process.env.BASEURL,
  },
  onDemandEntries: {
    maxInactiveAge: 24 * 60 * 60 * 1000,
  },
  webpack: (config) => {
    // Server .html-Files in i18n folder via raw-loader, to include it in translations.js
    config.module.rules.push(
      {
        test: /\.html$/,
        include: [
          path.resolve(__dirname, 'src', 'i18n'),
        ],
        use: 'raw-loader',
      },
    );

    return config;
  },
});
