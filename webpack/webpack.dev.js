const webpack = require('webpack');
const writeFilePlugin = require('write-file-webpack-plugin');
const webpackMerge = require('webpack-merge');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const CopyPlugin = require('copy-webpack-plugin');
// webpack css minifier
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const sass = require('sass');

const utils = require('./utils.js');
const commonConfig = require('./webpack.common.js');

const ENV = 'development';

module.exports = options =>
  webpackMerge(commonConfig({ env: ENV }), {
    devtool: 'eval-source-map',
    devServer: {
      contentBase: './target/classes/static/',
      proxy: [
        {
          context: ['/api', '/services', '/management', '/swagger-resources', '/v2/api-docs', '/h2-console', '/auth'],
          target: `http${options.tls ? 's' : ''}://localhost:8080`,
          secure: false,
          changeOrigin: options.tls
        }
      ],
      stats: options.stats,
      watchOptions: {
        ignored: /node_modules/
      },
      https: options.tls,
      historyApiFallback: true
    },
    entry: {
      polyfills: './src/main/webapp/app/polyfills',
      global: './src/main/webapp/content/scss/style.angular.scss',
      main: './src/main/webapp/app/app.main'
    },
    output: {
      path: utils.root('target/classes/static/'),
      filename: 'app/[name].bundle.js',
      chunkFilename: 'app/[id].chunk.js'
    },
    plugins: [
      process.env.JHI_DISABLE_WEBPACK_LOGS
        ? null
        : new SimpleProgressWebpackPlugin({
            format: options.stats === 'minimal' ? 'compact' : 'expanded'
          }),
      new FriendlyErrorsWebpackPlugin(),
      new ForkTsCheckerWebpackPlugin(),
      new BrowserSyncPlugin(
        {
          https: options.tls,
          host: 'localhost',
          port: 9000,
          proxy: {
            target: `http${options.tls ? 's' : ''}://localhost:9060`,
            proxyOptions: {
              changeOrigin: false //pass the Host header to the backend unchanged  https://github.com/Browsersync/browser-sync/issues/430
            }
          },
          socket: {
            clients: {
              heartbeatTimeout: 60000
            }
          }
        },
        {
          reload: false
        }
      ),
      // create css file
      new MiniCssExtractPlugin({
        filename: '[name].css'
      }),
      new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)/, path.resolve(__dirname, './src/main/webapp/')),
      new writeFilePlugin(),
      new webpack.WatchIgnorePlugin([utils.root('src/test')]),
      new WebpackNotifierPlugin({
        title: 'JHipster',
        contentImage: path.join(__dirname, 'logo-jhipster.png')
      }),
      //copy contnet to assests
      new CopyPlugin([
        {
          from: path.resolve(__dirname, './src/main/webapp/content'),
          to: utils.root('target/classes/static/assets')
        }
      ])
    ].filter(Boolean),
    module: {
      rules: [
        {
          test: /\.(j|t)s$/,
          enforce: 'pre',
          loader: 'eslint-loader',
          exclude: /node_modules/
        },
        {
          test: /\.ts$/,
          use: [
            'angular2-template-loader',
            {
              loader: 'cache-loader',
              options: {
                cacheDirectory: path.resolve('target/cache-loader')
              }
            },
            {
              loader: 'thread-loader',
              options: {
                // There should be 1 cpu for the fork-ts-checker-webpack-plugin.
                // The value may need to be adjusted (e.g. to 1) in some CI environments,
                // as cpus() may report more cores than what are available to the build.
                workers: require('os').cpus().length - 1
              }
            },
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                happyPackMode: true
              }
            }
          ],
          exclude: /(node_modules)/
        },
        {
          test: /\.scss$/,
          use: [
            'to-string-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: { implementation: sass }
            }
          ],
          exclude: /(style.angular\.scss)/
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        },
        {
          test: /\.(jpe?g|png|gif|svg|woff2?|ttf|eot)$/i,
          loader: 'file-loader',
          options: {
            digest: 'hex',
            hash: 'sha512',
            name: 'content/[hash].[ext]'
          }
        }
      ]
    },
    stats: process.env.JHI_DISABLE_WEBPACK_LOGS ? 'none' : options.stats,
    mode: 'development'
  });
