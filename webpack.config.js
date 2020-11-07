'use strict';

module.exports = {
  mode: "development",
  devtool:
    process.env.NODE_ENV === 'development' ? 'eval-source-map' : 'source-map',
  entry: {
    'StaggeredMouse': './StaggeredMouse/index.jsx',
  },
  output: {
    filename: '[name]/Staggered-Mouse-Balls.js',
    publicPath: '/StaggeredMouse/',
    path: __dirname + '/StaggeredMouse/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /build|lib|bower_components|node_modules/,
        loader: 'babel-loader'
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
};
