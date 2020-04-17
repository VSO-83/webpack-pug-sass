const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const {
//   getDirectoriesBasenames
// } = require('./build/utils.js');
// const pages = getDirectoriesBasenames(path.resolve('./src/pages'))

// const instances = pages.map(page => {
//   return new HtmlWebpackPlugin({
//     template: `./src/pages/${page}/${page}.pug`,
//     excludeAssets: [/-critical.css$/],
//     filename: `${page}.html`
//   })
// })

// const entries = pages.reduce((acc, page, i) => {
//   acc[page] = `./src/pages/${page}/${page}.js`
//   return acc
// }, {})

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  assets: 'assets/'
}

// Pages const for HtmlWebpackPlugin
// const PAGES_DIR = PATHS.src;
const PAGES_DIR = `${PATHS.src}/pages/index`;
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));


module.exports = {
  mode: 'development',
  entry: {
    // app: entries
    app: `${PATHS.src}/pages/index/index.js`,
    // module: `${PATHS.src}/index.js`
  },
  output: {
    path: PATHS.dist,
    filename: `${PATHS.assets}js/[name].[hash].js`,
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.scss', '.pug'],
    alias: {
      '@': '../..'
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  devtool: "inline-source-map",
  devServer: {
    // contentBase: '../src/pug/views',
    port: 9000,
    // overlay: {
    //   warnings: true,
    //   errors: true
    // }
  },
  module: {
    rules: [{
        test: /\.js$/,
        include: path.resolve(__dirname, '../src/js'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: 'env'
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: `./postcss.config.js`
              }
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        },
      },
      {
        test: /\.(woff|woff2|ttf|eot|otf)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{
        from: `${PATHS.src}/${PATHS.assets}img`,
        to: `${PATHS.assets}img`
      },
      {
        from: `${PATHS.src}/${PATHS.assets}fonts`,
        to: `${PATHS.assets}fonts`
      },
      {
        from: `${PATHS.src}/static`,
        to: ''
      },
    ]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery'
    }),
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].[hash].css`,
    }),
    // ...instances
    // Automatic creation any html pages
    ...PAGES.map(page => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `./${page.replace(/\.pug/,'.html')}`
    }))
  ]
};