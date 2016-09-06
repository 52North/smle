'use strict';
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var helpers = require('./webpack.helpers');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

var ENV = process.env.ENV = process.env.NODE_ENV = 'development';
var HMR = helpers.hasProcessFlag('hot');

var metadata = {
    title: 'smle',
    baseUrl: '.',
    host: 'localhost',
    port: 3000,
    ENV: ENV,
    HMR: HMR
};
/*
 * Config
 */
module.exports = {
    // static data for index.html
    metadata: metadata,
    devtool: 'cheap-module-eval-source-map',
    // cache: true,
    debug: true,

    // our angular app
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'main': './src/main.ts'
    },

    // Config for our build files
    output: {
        path: helpers.root('dist'),
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
    },

    resolve: {
        extensions: ['', '.ts', '.js'],
        alias: {
            'jquery.ui': 'jquery-ui'
        }
    },

    postcss: function () {
        return [autoprefixer];
    },

    module: {
        preLoaders: [
            // { test: /\.ts$/, loader: 'tslint-loader', exclude: [ root('node_modules') ] },
            // TODO(gdi2290): `exclude: [ root('node_modules/rxjs') ]` fixed with rxjs 5 beta.2 release
            {test: /\.js$/, loader: "source-map-loader", exclude: [helpers.root('node_modules/rxjs')]}
        ],
        loaders: [
            {test: /\.ts$/, loader: 'awesome-typescript-loader', exclude: [/\.(spec|e2e|async)\.ts$/]},
            {test: /\.json$/, loader: 'json-loader'},
            {test: /\.css$/, loader: 'raw-loader'},
            {test: /\.(gif|png)$/, loader: 'url-loader'},
            {test: /\.html$/, loader: 'raw-loader', exclude: [helpers.root('src/index.html')]},
            {test: /\.scss$/, loaders: ['raw-loader', 'sass-loader']},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader"},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=image/svg+xml'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/octet-stream"},
            {test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=application/font-woff'},
            {test: /bootstrap\/dist\/js\/umd\//, loader: 'imports?jQuery=jquery'}
        ]
    },

    plugins: [
        new ForkCheckerPlugin(),
        //new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.CommonsChunkPlugin({name: ['app', 'vendor', 'polyfills'], minChunks: Infinity}),
        // static assets
        new CopyWebpackPlugin([{from: 'src/assets', to: 'assets'}]),
        // generating html
        new HtmlWebpackPlugin({
          template: 'src/index.html',
          chunksSortMode: 'dependency'
        }),
        // replace
        new webpack.DefinePlugin({
            'ENV': JSON.stringify(metadata.ENV),
            'HMR': HMR
        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery',
            'Tether': 'tether',
            'window.Tether': "tether"
        })
    ],

    // Other module loader config
    tslint: {
        emitErrors: false,
        failOnHint: false,
        resourcePath: 'src'
    },
    // our Webpack Development Server config
    devServer: {
        port: metadata.port,
        host: metadata.host,
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        outputPath: helpers.root('dist')
    },
    // we need this due to problems with es6-shim
    node: {
        global: 'window',
        progress: false,
        crypto: 'empty',
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
};
