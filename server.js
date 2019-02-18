const compression = require('compression');
const next = require('next');
const nextAuth = require('next-auth');
const proxy = require('http-proxy-middleware');
const nextAuthConfig = require('./next-auth.config');

const dev = process.env.NODE_ENV !== 'production';

// Initialize Next.js
const nextApp = next({
  dir: '.',
  dev,
});

// Add next-auth to next app
nextApp
  .prepare()
  .then(() => nextAuthConfig())
  .then((nextAuthOptions) => {
    // Don't pass a port to NextAuth!
    // eslint-disable-next-line no-param-reassign
    if (nextAuthOptions.port) delete nextAuthOptions.port;
    return nextAuth(nextApp, nextAuthOptions);
  })
  .then((nextAuthApp) => {
    // Get instance of Express from NextAuth instance
    const { expressApp } = nextAuthApp;

    // Set specific properties only in production
    if (!dev) {
      // Compression
      expressApp.use(compression());
    }

    // /api -> backend
    expressApp.use(
      '/api',
      proxy({
        target: process.env.BACKEND_URL,
        changeOrigin: true,
      }),
    );

    // Default catch-all handler to allow Next.js to handle all other routes
    expressApp.all('*', (req, res) => {
      const nextRequestHandler = nextApp.getRequestHandler();
      return nextRequestHandler(req, res);
    });

    expressApp.listen(3000, (err) => {
      if (err) throw err;

      // eslint-disable-next-line no-console
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log('An error occurred, unable to start the server');
    // eslint-disable-next-line no-console
    console.log(err);
  });
