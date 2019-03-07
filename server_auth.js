const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');

/**
 * Convert Tokens to a User-Profile
 */
const tokenToProfile = async (req, accessToken, refreshToken, params, profile, done) => {
  const user = {
    id: 9999,
    name: '__DUMMY__',
    tokens: {
      accessToken,
      refreshToken,
      expiresIn: params ? params.expires_in : null,
      profile,
    },
  };
  done(null, user);
};

/**
 * Strategy which connects to our OAuth-Provider
 */
const authStrategy = new OAuth2Strategy({
  state: true,
  authorizationURL: `${process.env.OAUTH_URL}/${process.env.OAUTH_REALM}/oauth/authorize/`,
  tokenURL: `${process.env.OAUTH_URL}/${process.env.OAUTH_REALM}/oauth/token/`,
  clientID: process.env.OAUTH_CLIENTID,
  clientSecret: process.env.OAUTH_SECRET,
  callbackURL: `${process.env.BASEURL}/login`,
  passReqToCallback: true,
}, tokenToProfile);

/**
 * Initializes Authentication in Express-App
 *
 * @param pExpressApp App
 */
function auth(pExpressApp) {
  passport.use(authStrategy);
  pExpressApp.use(passport.initialize());
  pExpressApp.use(passport.session());

  pExpressApp.get('/login', passport.authenticate('oauth2', {
    session: true,
    successReturnToOrRedirect: '/',
    failureRedirect: '/error',
  }));

  pExpressApp.get('/logout', (req, res) => {
    req.session.destroy(() => res.redirect('/'));
  });

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
}

module.exports = auth;
