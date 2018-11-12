const path = require('path');

const aliasConfig = require('../config/componentsAliases');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: require.resolve('css-loader'),
            options: {
              modules: true,
              localIdentName: '[name]__[local]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: Object.assign({
      state: path.join(__dirname, '../src/redux'),
    }, aliasConfig),
  }
};
