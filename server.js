const next = require('next');
const nextAuth = require('next-auth');
const nextAuthConfig = require('./next-auth.config');
const proxy = require('http-proxy-middleware');

// Load environment variables from .env
require('dotenv').load();

// Initialize Next.js
const nextApp = next({dir: '.', dev: (process.env.NODE_ENV !== 'production')});

// Add next-auth to next app
nextApp.prepare()
    .then(async () => {
        // Load configuration and return config object
        const nextAuthOptions = await nextAuthConfig();

        // Pass Next.js App instance and NextAuth options to NextAuth
        const nextAuthApp = await nextAuth(nextApp, nextAuthOptions);

        const expressApp = nextAuthApp.expressApp;
        if (process.env.NODE_ENV !== 'production')
            expressApp.use('/api', proxy({target: 'http://localhost:8080', changeOrigin: true}));
        else
            expressApp.use('/api', proxy({target: 'http://' + process.env.BACKEND_PORT_8080_TCP_ADDR + ':8080', changeOrigin: true}));

        console.log(`Ready on http://localhost:${process.env.PORT || 3000}`)
    })
    .catch(err => {
        console.log('An error occurred, unable to start the server');
        console.log(err)
    });