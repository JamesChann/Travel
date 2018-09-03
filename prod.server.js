var express = require('express')
var compression = require('compression')
var config = require('./config/index')
var axios = require('axios')
const bodyParser = require('body-parser')

var port = process.env.PORT || config.build.port

var app = express()

var apiRoutes = express.Router()

apiRoutes.get('/getSliders', function (req, res) {
  var url = 'http://m.elong.com/home/api/gethotelbanners'
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

apiRoutes.get('/getCitys', function (req, res) {
  var url = 'http://m.elong.com/scenery/search/getcitydata'
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

apiRoutes.get('/getHomeInfo', function (req, res) {
  var url = 'http://m.elong.com/scenery/search/gethomepagedata'
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

apiRoutes.get('/getTopic', function (req, res) {
  var url = 'http://m.elong.com/scenery/search/getsearchlist'
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

apiRoutes.get('/getScenic', function (req, res) {
  var url = 'http://m.elong.com/scenery/search/getsearchdetail'
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

apiRoutes.get('/getCommit', function (req, res) {
  var url = 'http://m.elong.com/scenery/comment/getcommentlist'
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

app.use('/api', apiRoutes)

app.use(compression())

app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})