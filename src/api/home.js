// import jsonp from 'common/js/jsonp'
// import {options} from './config'
import axios from 'axios'

const debug = process.env.NODE_ENV !== 'production'

export function getSliders() {
  const url = debug ? '/api/getSliders' : 'http://118.190.147.105/travel/api/getSliders'

  const data = Object.assign({}, {
    _rt: '1534639382890'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 城市信息
export function getCitys() {
  const url = debug ? '/api/getCitys' : 'http://118.190.147.105/travel/api/getCitys'

  const data = Object.assign({}, {
    req: {
      'Type': [11, 12],
      'ImageSize': 0,
      'saleChannel': 1
    }
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 首页信息
export function getHomeInfo(cityId) {
  const url = debug ? '/api/getHomeInfo' : 'http://118.190.147.105/travel/api/getHomeInfo'

  const data = Object.assign({}, {
    req: {
      'currentCityId': '144',
      'lat': 30.94486,
      'lng': 117.81232,
      'searchCityId': cityId,
      'showNearby': false
    }
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
