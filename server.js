const express = require('express');
const proxy = require('http-proxy-middleware');
const next = require('next');

const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
      const server = express();

      if (dev)
        server.use('/api', proxy({target: 'http://localhost:8080', changeOrigin: true}));
      else
        server.use('/api', proxy({target: 'http://' + process.env.BACKEND_PORT_8080_TCP_ADDR + ':8080', changeOrigin: true}));

      server.get('*', (req, res) => {
        return handle(req, res)
      });

      server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`)
      })
    });