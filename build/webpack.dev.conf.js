'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const axios = require('axios')
const bodyParser = require('body-parser')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    before(app) {
      app.use(bodyParser.urlencoded({extended: true}))
      const querystring = require('querystring')

      // 获取banner图
      app.get('/api/getSliders', function (req, res) {
        const url = 'http://m.elong.com/home/api/gethotelbanners'
        axios.get(url, {
          headers: {
            referer: 'http://m.elong.com/',
            host: 'm.elong.com'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      })
      
      // 获取城市信息
      app.get('/api/getCitys', function (req, res) {
        const url = 'http://m.elong.com/scenery/search/getcitydata'
        axios.get(url, {
          headers: {
            referer: 'http://m.elong.com/',
            host: 'm.elong.com'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      })

      // 获取首页信息
      app.get('/api/getHomeInfo', function(req, res) {
        const url = 'http://m.elong.com/scenery/search/gethomepagedata'
        axios.get(url, {
          headers: {
            referer: 'http://m.elong.com',
            host: 'm.elong.com'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      })

      // 获取主题景点
      app.get('/api/getTopic', function(req, res) {
        const url = 'http://m.elong.com/scenery/search/getsearchlist'
        axios.get(url, {
          headers: {
            referer: 'http://m.elong.com',
            host: 'm.elong.com'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      })

      // 获取景点详情
      app.get('/api/getScenic', function(req, res) {
        const url = 'http://m.elong.com/scenery/search/getsearchdetail'
        axios.get(url, {
          headers: {
            referer: 'http://m.elong.com',
            host: 'm.elong.com'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      })

      // 得到评论信息
      app.get('/api/getCommit', function(req, res) {
        const url = 'http://m.elong.com/scenery/comment/getcommentlist'
        axios.get(url, {
          headers: {
            referer: 'http://m.elong.com',
            host: 'm.elong.com'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      })
      
    },
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
