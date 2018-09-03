<template>
  <div>
    <div class="home">
      <home-header @select="selectCity"></home-header>
      <div class="scroll-wrapper" v-show="data.length">
        <cube-scroll  ref="scroll" 
                      class="city-list" 
                      :data="data"
                      :options="options"
                      :scroll-events="['scroll']"
                      @scroll="onScrollHandle" 
                      @pulling-down="onPullingDown"
                      :refreshDelay="1000"
        >
          <div class="city-list-wrap">
            <!--下拉刷新-->
            <template slot="pulldown" slot-scope="props">
              <div  v-if="props.pullDownRefresh"
                    class="cube-pulldown-wrapper"
                    :style="pullDownStyle"
              >
                <div class="pulldown-content">
                  <img src="http://n.sinaimg.cn/sinacn/w620h368/20180211/4f3c-fyrkuxt4974326.jpg">
                  <span v-if="props.beforePullDown">{{ pullDownTip }}</span>
                  <template v-else>
                    <span v-if="props.isPullingDown">正在更新...</span>
                    <span v-else>更新成功</span>
                  </template>
                </div>
              </div>  
            </template>
            <div v-if="data.length">
              <home-slider :sliders="sliders"></home-slider>
              <home-icons :iconList="topicList" @select="selectTopic"></home-icons>
              <home-weekend :weekHotList="weekHotList" @selectScenic="selectScenic"></home-weekend>
              <home-recommend :recommendSceneryList="recommendSceneryList" @selectScenic="selectScenic"></home-recommend>
            </div>
          </div>
        </cube-scroll>
      </div>
      <!--loading-->
      <div class="loading-container" v-show="!data.length">
        <loading></loading>
      </div>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import HomeHeader from './components/header'
import HomeSlider from './components/slider'
import HomeIcons from './components/icons'
import HomeWeekend from './components/weekend'
import HomeRecommend from './components/recommend'
import Loading from 'base/loading/loading'
import {ERR_OK} from 'api/config'
import { getSliders, getHomeInfo } from 'api/home'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Home',
  components: {
    HomeHeader,
    HomeSlider,
    HomeIcons,
    HomeWeekend,
    HomeRecommend,
    Loading
  },
  data() {
    return {
      data: [],
      sliders: [],
      topicList: [],
      specialSubjectList: [],
      weekHotList: [],
      recommendSceneryList: [],
      options: {
        pullDownRefresh: {
          threshold: 60,
          stop: 44,
          txt: '更新成功'
        }
      },
      pullDownStyle: '',
      pullDownY: 0
    }
  },
  computed: {
    pullDownTip() {
      if (this.pullDownY <= 90) {
        return '下拉刷新...'
      } else {
        return '释放刷新...'
      }
    },
    ...mapGetters([
      'cityId'
    ])
  },
  created() {
    this._getSliders()
    this._getHomeInfo(this.cityId)
  },
  watch: {
    cityId(newVal, oldVal) {
      if (newVal === oldVal) {
        return
      }
      this._getHomeInfo(newVal)
    }
  },
  methods: {
    onPullingDown() {
      setTimeout(() => {
        this.$refs.scroll.forceUpdate()
      }, 1000)
    },
    onScrollHandle(pos) {
      this.pullDownY = pos.y
      if (pos.y > 0) {
        this.pullDownStyle = `top:${pos.y}px`
      }
    },
    selectCity() {
      this.$router.push({
        path: '/city'
      })
    },
    selectTopic(topic) {
      this.$router.push({
        path: '/topic'
      })
      this.setTopicId(topic.topicId)
    },
    selectScenic(scenic) {
      this.$router.push({
        path: `/scenic/${scenic.scenicId}`
      })
      this.setScenicId(scenic.scenicId)
    },
    _getSliders() {
      getSliders().then((res) => {
        if (res.errorCode === ERR_OK) {
          this.sliders = this._normalizeSliders(res.advList)
        }
      })
    },
    _getHomeInfo(cityId) {
      getHomeInfo(cityId).then((res) => {
        if (res.IsError === false) {
          this.topicList = res.topicList
          this.specialSubjectList = res.specialSubjectList
          this.weekHotList = res.weekHotList
          this.recommendSceneryList = res.recommendSceneryList
          this.data = this.topicList.concat(this.specialSubjectList).concat(this.weekHotList).concat(this.recommendSceneryList)
        }
      })
    },
    _normalizeSliders(list) {
      let arr = []
      list.forEach((item) => {
        arr.push({
          url: item.jumpLink,
          image: item.picUrl
        })
      })
      return arr
    },
    ...mapMutations({
      setTopicId: 'SET_TOPICID',
      setScenicId: 'SET_SCENICID'
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~common/stylus/variable.scss';

.home {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background: $color-body-background;
  .scroll-wrapper {
    height: 100%;
    .city-list-wrap {
      height: 100%;
      .cube-pulldown-wrapper {
        transform: translateY(-100%);
        line-height: 0;
        .pulldown-content {
          width: 100%;
          span {
            position: absolute;
            bottom: 15px;
            left: 0;
            right: 0;
            margin: auto;
            width: 200px;
            text-align: center;
            color: $color-text-tip;
            font-size: 14px;
          }
        }
      }
    }
  }
  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
