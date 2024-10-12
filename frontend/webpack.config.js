const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');

const ENTRY_PATH = path.resolve(__dirname, 'src/index.js');
const DIST_PATH = path.resolve(__dirname, 'dist');
const PUBLIC_PATH = path.resolve(__dirname, 'public');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const isAnalyze = Boolean(env?.analyze);
  const config = {
    resolve: {
      extensions: ['.jsx', '.js'],
      alias: {
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@': path.resolve(__dirname, 'src')
      }
    },
    entry: ENTRY_PATH,
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.(s[ac]ss|css)$/,
          use: ['style-loader', { loader: 'css-loader', options: { modules: true } }, 'sass-loader']
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: isProduction ? 'static/media/[name].[contenthash:6].[ext]' : '[path][name].[ext]'
              }
            }
          ]
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: isProduction ? 'static/fonts/[name].[ext]' : '[path][name].[ext]'
              }
            }
          ]
        }
      ]
    },
    output: {
      filename: 'js/main.[contenthash:6].js',
      path: DIST_PATH,
      chunkFilename: 'js/[name].chunk.js',
      publicPath: '/'
    },
    devServer: {
      hot: true,
      port: 3005,
      historyApiFallback: true,
      static: {
        directory: path.resolve(__dirname, 'public', 'index.html'),
        serveIndex: true,
        watch: true
      }
    },
    devtool: isProduction ? false : 'source-map',
    plugins: [
      // new MiniCssExtractPlugin({
      //   filename: isProduction ? 'static/css/[name].[contenthash:6].css' : '[name].css'
      // }),
      new Dotenv(),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: PUBLIC_PATH,
            to: DIST_PATH,
            filter: (name) => !name.endsWith('index.html')
          }
        ]
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
        favicon: path.resolve(__dirname, 'public', 'favicon.ico'),
        filename: 'index.html'
      }),
      new ESLintPlugin({
        extensions: ['.jsx', '.js']
      })
    ]
  };

  if (isProduction) {
    config.plugins = [
      ...config.plugins,
      new webpack.ProgressPlugin(),
      new CompressionPlugin({
        test: /\.(css|js)$/,
        algorithm: 'brotliCompress'
      }),
      new CleanWebpackPlugin()
    ];

    if (isAnalyze) {
      config.plugins = [...config.plugins, new BundleAnalyzerPlugin()];
    }

    config.optimization = {
      minimizer: [`...`, new CssMinimizerPlugin()]
    };
  }

  return config;
};
