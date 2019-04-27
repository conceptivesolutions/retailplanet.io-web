const path = require('path');

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
  // Remove the existing css rule
  config.module.rules = config.module.rules.filter(
    f => f.test.toString() !== '/\\.scss$/'
  );

  // Make whatever fine-grained changes you need
  config.module.rules.push({
    test: /\.scss$/,
    loaders: [
      "style-loader",
      {
        loader: "css-loader",
        options: {
          importLoaders: "1",
          localIdentName: "[name]__[local]___[hash:base64:5]",
          modules: true,
        }
      },
      "sass-loader"
    ],
    include: path.resolve(__dirname, '../'),
  });

  config.module.rules.push({
    test: /\.html$/,
    include: [
      path.resolve(__dirname, '..', 'src', 'i18n'),
    ],
    use: 'raw-loader',
  });

  // Return the altered config
  return config;
};
