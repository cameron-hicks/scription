const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');  // using?

// note: simplifieid regexes below during webpack approach lecture. may need to revert if things break.

console.log('environment printing from webpack.config:', process.env.NODE_ENV);
module.exports = {
  entry: './src/index.js',
  output:  {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  mode: process.env.NODE_ENV,
  plugins: [new MiniCssExtractPlugin()],
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
        test: /\.s?css/,
        use: [
          // Allows for modularized CSS
          MiniCssExtractPlugin.loader,
          // Creates `style` nodes from JS strings; inline if in development mode or as a bundled css file if in production
          process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ]          
      }
    ]
  },
  devServer: { 
    publicPath: '/build/',   // tells webpack where to put bundle.js    
    proxy: {
      '/api': 'http://localhost:3000',
      // '/api': {
      //   target: 'http://127.0.0.1:3000', // routes http requests through port 3000
      //   secure: false,
      //   changeOrigin: true
      // }
    },
    hot: true  
  },
  resolve: {
    // enables importing .js/.jsx without specifying the extensions (letters after the .)
    extensions: ['.js', '.jsx']
  }
};