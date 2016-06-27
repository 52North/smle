'use strict';
var helpers = require('./webpack.helpers');
var DefinePlugin  = require('webpack/lib/DefinePlugin');
var ENV = process.env.ENV = process.env.NODE_ENV = 'test';

/*
 * Config
 */
module.exports = {
  resolve: {
    extensions: [ '', '.ts', '.js' ],
    alias: {
      'jquery.ui': 'jquery-ui'
    }
  },
  devtool: 'inline-source-map',
  debug: true,
  module: {
    preLoaders: [
      {
        test: /\.ts$/,
        loader: 'tslint-loader',
        exclude: [ helpers.root('node_modules') ]
      },
      {
        test: /\.js$/,
        loader: "source-map-loader",
        exclude: [ helpers.root('node_modules/rxjs') ]
      }
    ],
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        query: {
          "compilerOptions": {
            "removeComments": true,
          }
        },
        exclude: [ /\.e2e\.ts$/ ]
      },
      { test: /\.json$/, loader: 'json-loader', exclude: [ helpers.root('src/index.html') ] },
      { test: /\.html$/, loader: 'raw-loader', exclude: [ helpers.root('src/index.html') ] },
      { test: /\.css$/, loader: 'raw-loader', exclude: [ helpers.root('src/index.html') ] },
      { test: /\.(gif|png)$/, loader: 'url-loader', exclude: [ helpers.root('src/index.html') ]},
      { test: /\.scss$/, loaders: ['raw-loader', 'sass-loader'], exclude: /node_modules/ },
      { test: /\.xml$/, loader: 'raw-loader', exclude: [ helpers.root('src/index.html') ] }

    ],
    postLoaders: [
      // instrument only testing sources with Istanbul
      {
        test: /\.(js|ts)$/,
        include: helpers.root('src'),
        loader: 'istanbul-instrumenter-loader',
        exclude: [
          /\.(e2e|spec)\.ts$/,
          /node_modules/
        ]
      }
    ]
  },
  plugins: [
    new DefinePlugin({
      'ENV': JSON.stringify(ENV),
      'HMR': false
    })
  ],
    // we need this due to problems with es6-shim
  node: {
    global: 'window',
    progress: false,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  },
  tslint: {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'src'
  }
};
