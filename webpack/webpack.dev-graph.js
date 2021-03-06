var webpack = require('webpack');
var path = require("path");
var copyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8082',
        'webpack/hot/dev-server',
        './graph-editor/index.ts'
    ],
    output: {
      path: path.resolve("./", "dist"),
      publicPath: "/assets/",
      filename: "bundle_graph.js"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' as resolvable extensions.
        extensions: [".ts", ".js"]
    },
    devServer: {
        contentBase: ['./graph-editor','./icons'],
        port: 8082
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new copyWebpackPlugin([
          {from: './node_modules/jsonforms/lib/native-shim.js'},
          {from: 'node_modules/jointjs/dist/joint.min.css'},
          {from: './node_modules/jsongraph/dist/jsongraph-example.css'},
          {from: './node_modules/jsonforms/dist/jsonforms-example.css'},
          {from: './Roboto-Regular.ttf'},
        ])
    ],
    module: {
      rules: [
        { enforce: 'pre', test: /\.js$/, exclude: /node_modules/, loader: 'source-map-loader' },
        { test: /\.ts$/, exclude: /node_modules/, loader: 'awesome-typescript-loader' }
      ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
    },
    node: {
      fs: 'empty'
    }
};
