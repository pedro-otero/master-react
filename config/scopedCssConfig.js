module.exports = {
  test: /\.css$/,
  use: [
    { loader: 'style-loader' },
    {
      loader: require.resolve('css-loader'),
      options: {
        modules: true,
        localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
      },
    },
  ],
};
