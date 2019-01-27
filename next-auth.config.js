const nextAuthProviders = require('./next-auth.providers');
const nextAuthFunctions = require('./next-auth.functions');
const expressSession = require('express-session');

module.exports = () => {
  return nextAuthFunctions()
      .then(functions => {
        return new Promise((resolve, reject) => {
          // This is the config block we return, ready to be passed to NextAuth
          resolve({
                    port: 3000,
                    sessionSecret: process.env.SESSION_SECRET || 'dummySecret123',
                    // Maximum Session Age in ms (optional, default is 7 days).
                    // The expiry time for a session is reset every time a user revisits
                    // the site or revalidates their session token. This is the maximum
                    // idle time value.
                    sessionMaxAge: 60000 * 60 * 24 * 7,
                    // Session Revalidation in X ms (optional, default is 60 seconds).
                    // Specifies how often a Single Page App should revalidate a session.
                    // Does not impact the session life on the server, but causes clients
                    // to refetch session info (even if it is in a local cache) after N
                    // seconds has elapsed since it was last checked so they always display
                    // state correctly.
                    // If set to 0 will revalidate a session before rendering every page.
                    sessionRevalidateAge: 0,
                    expressSession: expressSession,
                    providers: nextAuthProviders(),
                    functions: functions
                  })
        })
      })
};
