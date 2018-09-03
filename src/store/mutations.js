import * as types from './mutation-types'

const mutations = {
  [types.SET_CITYID](state, cityId) {
    state.cityId = cityId
  },
  [types.SET_CITYNAME](state, cityName) {
    state.cityName = cityName
  },
  [types.SET_TOPICID](state, topicId) {
    state.topicId = topicId
  },
  [types.SET_SCENICID](state, scenicId) {
    state.scenicId = scenicId
  }
}

export default mutations
