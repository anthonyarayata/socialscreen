const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
    {
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    },
  ]},
  resolve: {
    extensions: ['.js', '.mjs'],
    fallback: {
      util: require.resolve('util/'),
      querystring: require.resolve('querystring/'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer/'),
      path: require.resolve('path-browserify'),
      assert: require.resolve('assert/'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify/browser'),
      zlib: require.resolve('browserify-zlib'),
      'fuse.js': require.resolve('fuse.js/dist/fuse.js'), // Add this line for fuse.js
    },
  },
  externals: {
    'webextension-polyfill': 'chrome', // Treat webextension-polyfill as an external dependency
  },
};
