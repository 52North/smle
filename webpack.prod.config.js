'use strict';

var helpers = require('./webpack.helpers');
// Webpack Plugins
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var WebpackDedupePlugin = require('webpack/lib/optimize/DedupePlugin');
// var WebpackOccurenceOrderPlugin = require('webpack/lib/optimize/OccurenceOrderPlugin');
var WebpackCommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var WebpackUglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
var CompressionPlugin = require('compression-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
var WebpackMd5Hash = require('webpack-md5-hash');
var ENV = process.env.NODE_ENV = process.env.ENV = 'production';
var HOST = process.env.HOST || 'localhost';
var PORT = process.env.PORT || 8080;

var metadata = {
    title: 'smle',
    baseUrl: '/',
    host: HOST,
    port: PORT,
    ENV: ENV
};

/*
 * Config
 */
module.exports = {
    // static data for index.html
    metadata: metadata,
    // for faster builds use 'eval'
    devtool: 'source-map',
    debug: false,

    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'main': './src/main.ts'
    },

    // Config for our build files
    output: {
        path: helpers.root('dist'),
        filename: '[name].[chunkhash].bundle.js',
        sourceMapFilename: '[name].[chunkhash].bundle.map',
        chunkFilename: '[id].[chunkhash].chunk.js'
    },

    resolve: {
        extensions: ['', '.ts', '.js'],
        alias: {
            'jquery.ui': 'jquery-ui'
        }
    },

    postcss: [autoprefixer],

    module: {
        preLoaders: [{
            test: /\.ts$/,
            loader: 'tslint-loader',
            exclude: [
                helpers.root('node_modules')
            ]
        }, {
            test: /\.js$/,
            loader: "source-map-loader",
            exclude: [
                helpers.root('node_modules/rxjs')
            ]
        }],
        loaders: [
            // Support Angular 2 async routes via .async.ts
            {
                test: /\.async\.ts$/,
                loaders: ['es6-promise-loader', 'ts-loader'],
                exclude: [/\.(spec|e2e)\.ts$/]
            },
            // Support for .ts files.
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                query: {
                    'compilerOptions': {
                        'removeComments': true
                    }
                },
                exclude: [/\.(spec|e2e)\.ts$/]
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }, {
                test: /\.css$/,
                loader: 'raw-loader'
            }, {
                test: /\.(gif|png)$/,
                loader: 'url-loader'
            }, {
                test: /\.html$/,
                loader: 'raw-loader',
                exclude: [helpers.root('src/index.html')]
            }, {
                test: /\.scss$/,
                loaders: ['raw-loader', 'sass-loader']
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader"
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader?mimetype=image/svg+xml'
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader?mimetype=application/octet-stream"
            }, {
                test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader?mimetype=application/font-woff'
            }, {
                test: /bootstrap\/dist\/js\/umd\//,
                loader: 'imports?jQuery=jquery'
            }
        ],
        noParse: [
            helpers.root('zone.js', 'dist'),
            helpers.root('angular2', 'bundles')
        ]
    },

    plugins: [
        new ForkCheckerPlugin(),
        new WebpackMd5Hash(),
        //new WebpackDedupePlugin(),
        //new WebpackOccurenceOrderPlugin(true),
        new WebpackCommonsChunkPlugin({
            name: ['polyfills', 'vendor'].reverse(),
            filename: '[name].[chunkhash].bundle.js',
            minChunks: Infinity
        }),
        // static assets
        new CopyWebpackPlugin([{
            from: 'src/assets',
            to: 'assets'
        }]),
        new CopyWebpackPlugin([{
            from: 'src/examples',
            to: 'examples'
        }]),
        new CopyWebpackPlugin([{
            from: 'src/config.json',
            to: 'config.json'
        }]),
        new CopyWebpackPlugin([{
            from: 'src/description-config.json',
            to: 'description-config.json'
        }]),
        // generating html
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            chunksSortMode: 'dependency'
        }),
        new webpack.DefinePlugin({
            // Environment helpers
            'ENV': JSON.stringify(metadata.ENV),
            'HMR': false
        }),
        new webpack.ProvidePlugin({
            'jQuery': 'jquery',
            '$': 'jquery',
            'jquery': 'jquery',
            'Tether': 'tether',
            'window.Tether': "tether"
        }),
        new WebpackUglifyJsPlugin({
            // to debug prod builds uncomment //debug lines and comment //prod lines

            // beautify: true,//debug
            // mangle: false,//debug
            // dead_code: false,//debug
            // unused: false,//debug
            // deadCode: false,//debug
            // compress : { screw_ie8 : true, keep_fnames: true, drop_debugger: false, dead_code: false, unused: false, }, // debug
            // comments: true,//debug

            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false

        }),
        // include uglify in production
        new CompressionPlugin({
            algorithm: helpers.gzipMaxLevel,
            regExp: /\.css$|\.html$|\.js$|\.map$/,
            threshold: 2 * 1024
        })
    ],
    // Other module loader config
    tslint: {
        emitErrors: true,
        failOnHint: true,
        resourcePath: 'src'
    },

    htmlLoader: {
        minimize: true,
        removeAttributeQuotes: false,
        caseSensitive: true,
        customAttrSurround: [
            [/#/, /(?:)/],
            [/\*/, /(?:)/],
            [/\[?\(?/, /(?:)/]
        ],
        customAttrAssign: [/\)?\]?=/]
    },

    // we need this due to problems with es6-shim
    node: {
        global: 'window',
        progress: false,
        //crypto: 'empty',
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
};
