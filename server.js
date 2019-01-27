const next = require('next');
const nextAuth = require('next-auth');
const nextAuthConfig = require('./next-auth.config');
const proxy = require('http-proxy-middleware');
const dev = process.env.NODE_ENV !== 'production';

// Initialize Next.js
const nextApp = next({dir: '.', dev: dev});

// Add next-auth to next app
nextApp
    .prepare()
    .then(() => {
      return nextAuthConfig()
    })
    .then(nextAuthOptions => {
      // Don't pass a port to NextAuth!
      if (nextAuthOptions.port)
        delete nextAuthOptions.port;
      return nextAuth(nextApp, nextAuthOptions)
    })
    .then(nextAuthApp => {
      // Get instance of Express from NextAuth instance
      const expressApp = nextAuthApp.expressApp;

      if (dev)
        expressApp.use('/api', proxy({target: 'http://localhost:8080', changeOrigin: true}));
      else
        expressApp.use('/api', proxy({target: 'http://' + process.env.BACKEND_PORT_8080_TCP_ADDR + ':8080', changeOrigin: true}));

      // Default catch-all handler to allow Next.js to handle all other routes
      expressApp.all('*', (req, res) => {
        let nextRequestHandler = nextApp.getRequestHandler();
        return nextRequestHandler(req, res)
      });

      expressApp.listen(3000, err => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000')
      });
    })
    .catch(err => {
      console.log('An error occurred, unable to start the server');
      console.log(err)
    });