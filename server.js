const compression = require('compression');
const express = require('express');
const session = require('express-session');
const next = require('next');
const proxy = require('http-proxy-middleware');
const serverAuth = require('./server_auth');

const dev = process.env.NODE_ENV !== 'production';

// Initialize Next.js
const nextApp = next({
  dir: '.',
  dev,
});

nextApp
  .prepare()
  .then(() => {
    const expressApp = express();

    // Set specific properties only in production
    if (!dev) {
      // Compression
      expressApp.use(compression());

      // Static content
      expressApp.use('/static', express.static(`${__dirname}/static`, {
        maxAge: '365d',
      }));
    }

    // Enable Session-Support for Express-Server
    expressApp.use(session({
      secret: '87asd9f87-abv9v78098ui--2sdg2fb&=!2e2zn124',
      resave: true,
      saveUninitialized: false,
    }));

    // Enable authentication
    serverAuth(expressApp);

    // /api -> backend
    expressApp.use(
      '/api',
      proxy({
        target: process.env.BACKEND_URL,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': '/',
        },
      }),
    );

    // Default catch-all handler to allow Next.js to handle all other routes
    expressApp.all('*', (req, res) => {
      const nextRequestHandler = nextApp.getRequestHandler();
      return nextRequestHandler(req, res);
    });

    expressApp.listen(3000, (err) => {
      if (err)
        throw err;

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
