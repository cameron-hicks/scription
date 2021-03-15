const path = require('path');

module.exports = {
  entry: './src/index.js',
  output:  {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: ['source-map-loader', {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }],
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  // development mode settings
  devServer: { 
    publicPath: '/build/',   // where to put bundle.js    
    headers: { 'Access-Control-Allow-Origin': '*' },    // allow cors from any host
    proxy: {
      '/api': 'http://localhost:3000',
      '/auth': 'http://localhost:3000',
    },
    hot: true,
    contentBase: path.join(__dirname, 'public')  // where to load static files from
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};