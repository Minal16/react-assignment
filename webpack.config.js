// In webpack.config.js
var path = require("path");
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, 'src/index.html'),
  filename: 'index.html',
  inject: 'body'
});

var pluginsList = [
  HTMLWebpackPluginConfig,
  new ExtractTextPlugin('index.css', { allChunks: true }),
  new CopyWebpackPlugin([{ from: 'assets' }]),
];

if ( process.env.NODE_ENV === 'production' ) {
  pluginsList.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  );
}

module.exports = {
  debug: true,
  devtool: 'cheap-module-source-map',
  devServer: {
    // This is required for webpack-dev-server. The path should
    // be an absolute path to your build destination.
    outputPath: path.join(__dirname, 'public'),
  },
  entry: [
    './client/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: "/",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        exclude: [
          /node_modules/,
          path.resolve(__dirname, 'tests'),
        ],
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
      },
      {
        test: /\.svg$/,
        loader: "url-loader?limit=10000&mimetype=image/svg+xml"
      },
    ]
  },

  postcss: function (webpack) {
    return [
      require('postcss-import')({ addDependencyTo: webpack }),
      require('autoprefixer'),
      require('precss'), // add compression in production!
    ];
  },

  plugins: pluginsList
};
