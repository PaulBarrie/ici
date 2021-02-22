const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const path = require('path');
const { config } = require('process');
const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

module.exports = {
  context: __dirname,
  entry: ["./src/index.js"],
  stats: "verbose",
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
  output: { 
      path: path.join(__dirname, "/src"),
      filename: "index.js",
      publicPath: "/"
  },
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
  }, 
  devServer: { 
    hot: true,
    contentBase: './',
    historyApiFallback: true,
    inline: true,
    compress: true,
    disableHostCheck: true,
    host: host,
    port: port,
    proxy: {
      '/api': {
        target:  "http://api:3009/graphql",
        pathRewrite: {'^/api': ''}
      },
      '/loc': {
        target:  "http://ifconfig.co/json",
        pathRewrite: {'^/loc': ''}
      }
  }},
  module: {
    rules: [
       {
          test: /\.jsx$/,
          use: 'babel-loader',
          exclude: "/node_modules"
       },
       { test: /\.js$/,
         loader: 'babel-loader', 
         exclude: /node_modules/ },
       {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
       },
       {
        test: /\.scss$/,
        use: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        use: {
            loader: 'url-loader?limit=100000',
          }
      
      }
    ]
    },
    plugins: [
        new HtmlWebPackPlugin({
          template: path.resolve( __dirname, 'public/index.html' ),
        })
    ]
}
