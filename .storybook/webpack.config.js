module.exports = config => {

  config.module.rules.push({
                             test: /\.(scss|sass)$/,
                             use: [
                               'style-loader',
                               'css-loader',
                               'sass-loader'
                             ]
                           });

  return config;
};