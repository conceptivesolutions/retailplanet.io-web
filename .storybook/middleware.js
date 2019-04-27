const proxy = require('http-proxy-middleware');

module.exports = function expressMiddleware(router) {
  router.use('/static', proxy(
    {
      target: 'http://localhost:6006/',
      changeOrigin: true,
      pathRewrite: {
        '^/static': '/'
      }
    }));
};
