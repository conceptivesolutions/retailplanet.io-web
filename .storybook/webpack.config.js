const path = require('path');

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
            localIdentName: '[local]___[hash:base64:5]',
          }
        },
        require.resolve('sass-loader')
      ]
    },
    {
      test: /\.html$/,
      include: [
        path.resolve(__dirname, '..', 'src', 'i18n'),
      ],
      use: 'raw-loader',
    });

  return config;

};
