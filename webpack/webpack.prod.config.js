var config            = require("./webpack.config.js");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var prodConfig = {
  devtool: "source-map",

  entry: config.entry,

  resolve: config.resolve,

  output: config.output,

  plugins: [
    // new ExtractTextPlugin("styles.css"),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  ].concat(config.plugins),

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
      // {
      //   test: /\.css$/,
      //   loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]&minimize!postcss-loader')
      // },
    ].concat(config.module.loaders),
  },

  // postcss: config.postcss,

  postcss: function (webpack) {
    return config.postcssPlugins;
  }

};

module.exports = prodConfig;
