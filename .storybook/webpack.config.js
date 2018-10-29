const path = require('path');

const scopedCssConfig = require('../config/scopedCssConfig');
const aliasConfig = require('../config/componentsAliases');

module.exports = {
  module: {
    rules: [
      scopedCssConfig,
    ],
  },
  resolve: {
    alias: Object.assign({
      state: path.join(__dirname, '../src/redux'),
    }, aliasConfig),
  }
};
