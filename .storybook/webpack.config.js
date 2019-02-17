const path = require('path');
const cssHelper = require('../src/helpers/CSSLoaderHelper');

module.exports = (config) => {

  config.module.rules.push(
    {
      test: /\.scss$/,
      loaders: [
        require.resolve('style-loader'),
        {
          loader: require.resolve('css-loader'),
          options: {
            importLoaders: 1,
            modules: true,
            getLocalIdent: (loaderContext, localIdentName, localName) => {
              if (!cssHelper.canBeTransformed(loaderContext.resourcePath.replace(/\\/g, '/')))
              {
                return localName;
              }
              const fileName = path.basename(loaderContext.resourcePath);
              return `${fileName.replace(/\.[^/.]+$/, '')}___${localName}`;
            }
          }
        },
        require.resolve('sass-loader')
      ]
    });

  return config;

};