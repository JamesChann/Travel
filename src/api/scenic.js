import axios from 'axios'

const debug = process.env.NODE_ENV !== 'production'

export function getScenic(sceneryId) {
  const url = debug ? '/api/getScenic' : 'http://118.190.147.105/travel/api/getScenic'

  const data = Object.assign({}, {
    req: {
      sceneryId,
      'imageSize': 1
    }
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getCommit(sceneryId, pageIndex) {
  const url = debug ? '/api/getCommit' : 'http://118.190.147.105/travel/api/getCommit'

  const data = Object.assign({}, {
    req: {
      sceneryId,
      pageIndex,
      'pageSize': 20,
      'filterItemList': []
    }
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}