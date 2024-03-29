const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const fetch = require('node-fetch');

/**
 * Retrieves all user information from retailplanet backend
 *
 * @param accessToken Token of the current user to retrieve information for
 */
function retrieveUserInfo(accessToken) {
  return fetch(`${process.env.BACKEND_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then(pResult => pResult.json());
}

/**
 * Convert Tokens to a User-Profile
 */
const tokenToProfile = async (accessToken, refreshToken, extraParams, profile, done) => {
  const { id, name, nickname, _json: { email } } = profile;
  const user = {
    profile: {
      id,
      name,
      username: nickname,
      email,
    },
    tokens: {
      accessToken,
      refreshToken,
    },
    info: {},
  };

  retrieveUserInfo(accessToken)
    .then((pResult) => {
      user.info = {
        ...pResult,
      };
      delete user.info.id;
      delete user.info.avatar;
    })
    .catch(console.log)
    .finally(() => done(null, user));
};

/**
 * Strategy which connects to our OAuth-Provider
 */
const authStrategy = new Auth0Strategy({
  state: true,
  domain: process.env.OAUTH_URL,
  clientID: process.env.OAUTH_CLIENTID,
  clientSecret: process.env.OAUTH_SECRET,
  callbackURL: `${process.env.BASEURL}/login`,
  scope: 'openid email profile',
}, tokenToProfile);

/**
 * Initializes Authentication in Express-App
 *
 * @param pExpressApp App
 */
function auth(pExpressApp) {
  passport.use('auth0', authStrategy);
  pExpressApp.use(passport.initialize());
  pExpressApp.use(passport.session());

  pExpressApp.get('/login', passport.authenticate('auth0', {
    audience: 'api.retailplanet.io',
    session: true,
    successReturnToOrRedirect: '/',
    failureRedirect: '/',
  }));

  pExpressApp.get('/logout', (req, res) => {
    req.logout();
    res.redirect(`https://${process.env.OAUTH_URL}/v2/logout?client_id=${process.env.OAUTH_CLIENTID}&returnTo=${process.env.BASEURL}`);
  });

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
}

module.exports = auth;
