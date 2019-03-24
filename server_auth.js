const passport = require('passport');
const { Strategy } = require('passport-openidconnect');

/**
 * Convert Tokens to a User-Profile
 */
// eslint-disable-next-line
const tokenToProfile = async (issuer, sub, { id, name, _json: { preferred_username, email }, _raw }, accessToken, refreshToken, done) => {
  const user = {
    profile: {
      id,
      name,
      username: preferred_username,
      email,
    },
    tokens: {
      accessToken,
      refreshToken,
    },
  };
  done(null, user);
};
/**
 * Strategy which connects to our OAuth-Provider
 */
const authStrategy = new Strategy({
  state: true,
  issuer: 'http://gravitee.am',
  authorizationURL: `${process.env.OAUTH_URL}/${process.env.OAUTH_REALM}/oauth/authorize/`,
  tokenURL: `${process.env.OAUTH_URL}/${process.env.OAUTH_REALM}/oauth/token/`,
  userInfoURL: `${process.env.OAUTH_URL}/${process.env.OAUTH_REALM}/oidc/userinfo`,
  clientID: process.env.OAUTH_CLIENTID,
  clientSecret: process.env.OAUTH_SECRET,
  callbackURL: `${process.env.BASEURL}/login`,
  scope: 'openid profile email',
}, tokenToProfile);

/**
 * Initializes Authentication in Express-App
 *
 * @param pExpressApp App
 */
function auth(pExpressApp) {
  passport.use('oidc', authStrategy);
  pExpressApp.use(passport.initialize());
  pExpressApp.use(passport.session());

  pExpressApp.get('/login', passport.authenticate('oidc', {
    session: true,
    successReturnToOrRedirect: '/',
    failureRedirect: '/',
  }));

  pExpressApp.get('/logout', (req, res) => {
    req.logout();
    res.redirect(`${process.env.OAUTH_URL}/${process.env.OAUTH_REALM}/logout?target_url=${process.env.BASEURL}`);
  });

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
}

module.exports = auth;
