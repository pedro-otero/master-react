module.exports = {
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
};
