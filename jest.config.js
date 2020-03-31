const aliases = require('./config/componentsAliases');

module.exports = {
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 91,
      lines: 93,
      statements: 93,
    },
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,mjs}',
    '!src/**/*.stories.js',
    '!src/**/*.cypress.js',
    '!src/index.js',
    '!src/registerServiceWorker.js',
    '!src/redux/store/index.js',
    '!src/stories/**/*.js',
  ],
  setupFiles: ['<rootDir>/config/polyfills.js'],
  setupFilesAfterEnv: ['<rootDir>/config/test-setup.js'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,mjs}',
    '<rootDir>/src/**/*.(spec|test).{js,jsx,mjs}',
  ],
  testEnvironment: 'jsdom',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|mjs|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$',
  ],
  moduleNameMapper: Object.assign({
    '^react-native$': 'react-native-web',
    '\\.(css|less)$': 'identity-obj-proxy',
    'state/(.*)': '<rootDir>/src/redux/$1',
  }, Object.entries(aliases).reduce((modules, [alias, path]) => Object.assign(modules, {
    [`^${alias}$`]: `${path}`,
  }), {})),
  moduleFileExtensions: [
    'web.js',
    'js',
    'json',
    'web.jsx',
    'jsx',
    'node',
    'mjs',
  ],
};
