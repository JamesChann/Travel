import * as types from './mutation-types'

export const selectCity = function({commit, state}, {cityId, cityName}) {
  commit(types.SET_CITYID, cityId)
  commit(types.SET_CITYNAME, cityName)
}