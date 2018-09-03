import axios from 'axios'

const debug = process.env.NODE_ENV !== 'production'

export function getTopic(cityId, topicId, page, filterType, filterId) {
  const url = debug ? '/api/getTopic' : 'http://118.190.147.105/travel/api/getTopic'

  const data = Object.assign({}, {
    req: {
      'currentCityId': '144',
      'imageSize': 4,
      'keyword': '',
      'lat': 30.94486,
      'lng': 117.81232,
      'searchCityId': cityId,
      'searchType': 2,
      'page': {'pageIndex': page, 'pageSize': 20},
      'showDistanceFilter': false,
      'specialSaleSelected': 0,
      'distanceFilterList': [],
      'orderFilterList': [{'isSelected': 1, 'filterDesc': filterType, 'filterId': filterId, 'filterType': 3}],
      'todayAvailable': 0,
      'topicFilterList': [{'isSelected': 1, 'filterDesc': 62914527, 'filterId': topicId, 'filterType': 3}],
      'surroundingCityFilterList': [],
      'trace': 'topic_home'
    }
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}