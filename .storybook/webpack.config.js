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
    });

  return config;

};
