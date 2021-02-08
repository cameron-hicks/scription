const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');  // using?

// note: simplifieid regexes below during webpack approach lecture. may need to revert if things break.

console.log('environment printing from webpack.config:', process.env.NODE_ENV);
module.exports = {
  entry: './src/index.js',
  output:  {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  mode: process.env.NODE_ENV,
  // plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader']
      }
    ]
  },
  devServer: { 
    publicPath: '/build/',   // tells webpack where to put bundle.js    
    headers: { 'Access-Control-Allow-Origin': '*' },    // allow cors
    proxy: {
      '/api': 'http://localhost:3000',
      '/auth': 'http://localhost:3000',
    },
    hot: true,
    contentBase: path.join(__dirname, 'public')  // where to load static files from
  },
  resolve: {
    // enables importing .js/.jsx without specifying the extensions (letters after the .)
    extensions: ['.js', '.jsx']
  }
};