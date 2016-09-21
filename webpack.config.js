var webpack = require('webpack')

module.exports = {
  entry: './index.js',
  output: {
    path: __dirname,
    filename: 'fuzzyfind.min.js',
    libraryTarget: 'var',
    library: 'fuzzyfind',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
    }),
    new webpack.BannerPlugin([
      'Fuzzyfind - https://github.com/amjith/fuzzyfind',
      'A matching algorithm for filtering and ranking a list based on partial user input.',
      'Copyright (C) 2016 Amjith Ramanujam',
      '@license MIT',
    ].join('\n'), {
      entryOnly: true,
    }),
  ],
};
