<template>
  <div class="listview">
    <!--tab切换-->
      <cube-tab-bar v-model="selectedLabel" showSlider @click="clickHandler">
        <cube-tab v-for="(item, index) in tabs" :label="item.label" :key="item.label">
        </cube-tab>
      </cube-tab-bar>
      <cube-tab-panels v-model="selectedLabel">
        <cube-tab-panel v-for="(item, index) in tabs" :label="item.label" :key="item.label">
          <div class="scroll-wrapper">
            <cube-scroll  ref="scroll" 
                          class="city-list" 
                          :data="allCitys" 
                          :options="options"
                          :scroll-events="['scroll']"
                          @scroll="onScrollHandle" 
                          @pulling-down="onPullingDown"
            >
              <!--下拉刷新-->
              <template slot="pulldown" slot-scope="props">
                <div  v-if="props.pullDownRefresh"
                      class="cube-pulldown-wrapper"
                      :style="pullDownStyle"
                >
                  <div class="pulldown-content">
                    <img src="http://om0jxp12h.bkt.clouddn.com/pulldow-img.jpg">
                    <span v-if="props.beforePullDown">{{ pullDownTip }}</span>
                    <template v-else>
                      <span v-if="props.isPullingDown">正在更新...</span>
                      <span v-else>更新成功</span>
                    </template>
                  </div>
                </div>  
              </template>
              <!--当前位置-->
              <div class="area">
                <div class="tit">您的位置</div>
                <div class="cont">
                  <div class="cont-item">
                    <div class="cont-item-box">杭州</div>
                  </div>
                </div>
              </div>
              <!--热门城市-->
              <div class="area">
                <div class="tit">热门城市</div>
                <div class="cont">
                  <div class="cont-item"
                      v-for="(hotcity, index) in item.hotcitys"
                      :key="index"
                  >
                    <div class="cont-item-box">
                      {{ hotcity.cityName }}
                    </div>
                  </div>
                </div>
              </div>
              <!--所有城市-->
              <div class="area" v-for="(allcity, index) of item.allcitys" :key="index" ref="listGroup">
                <div class="tit">{{ allcity.key }}</div>
                <div class="cont" v-for="(innerItem, index) of allcity.cityList" :key="index">
                    {{ innerItem.cityName }}
                </div>
              </div>
            </cube-scroll>
          </div>
        </cube-tab-panel>
      </cube-tab-panels>
    <!--字母表-->
    <div class="list-shortcut"
         @touchstart="onShortcutTouchStart"
         @touchmove.stop.prevent="onShortcutTouchMove"
    >
      <ul>
        <li v-for="(item, index) in anchorList"
            :key="index"
            class="item"
            :data-index="index"
        >
          {{ item.key }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getData } from 'common/js/dom'

export default {
  name: 'ListView',
  props: {
    hotCitys: {
      type: Array,
      default: () => []
    },
    allCitys: {
      type: Array,
      default: () => []
    },
    hotSug: {
      type: Array,
      default: () => []
    },
    allSug: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      options: {
        pullDownRefresh: {
          threshold: 60,
          stop: 44,
          txt: '更新成功'
        }
      },
      pullDownStyle: '',
      pullDownY: 0,
      selectedLabel: '国内城市',
      tabs: [{
        label: '国内城市',
        hotcitys: [],
        allcitys: {}
      }, {
        label: '海外城市',
        hotcitys: [],
        allcitys: {}
      }],
      anchorList: [],
      flag: false,
      labelFlag: ''
    }
  },
  computed: {
    pullDownTip() {
      if (this.pullDownY <= 60) {
        return '下拉刷新...'
      } else if (this.pullDownY <= 90) {
        return '继续下拉有惊喜！'
      } else {
        return '松开手有惊喜！'
      }
    }
  },
  watch: {
    hotCitys(newVal) {
      this.tabs[0].hotcitys = newVal
    },
    allCitys(newVal) {
      this.tabs[0].allcitys = newVal
      this.anchorList = newVal
    },
    hotSug(newVal) {
      this.tabs[1].hotcitys = newVal
    },
    allSug(newVal) {
      this.tabs[1].allcitys = newVal
    }
  },
  created() {
    this.touch = {}
  },
  methods: {
    clickHandler (label) {
      this.labelFlag = label
      this.anchorList = label === '国内城市' ? this.allCitys : this.allSug
    },
    onPullingDown() {
      console.log(this.$refs.scroll[0])
      setTimeout(() => {
        this.$refs.scroll[0].forceUpdate()
      }, 1000)
    },
    onScrollHandle(pos) {
      this.pullDownY = pos.y
      if (pos.y > 0) {
        this.pullDownStyle = `top:${pos.y}px`
      }
    },
    onShortcutTouchStart(e) {
      let anchorIndex = getData(e.target, 'index')
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    _scrollTo(index) {
      console.log(this.labelFlag)
      if (this.labelFlag === '') {
        this.$refs.scroll[0].scrollToElement(this.$refs.listGroup[index], 0)
      } else if (this.labelFlag === '国内城市') {
        this.$refs.scroll[0].scrollToElement(this.$refs.listGroup[index], 0)
      } else if (this.labelFlag === '海外城市') {
        this.$refs.scroll[1].scrollToElement(this.$refs.listGroup[index], 0)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.listview >>> .cube-tab-bar
  background: $color-background
  .cube-tab
    padding: .3rem 0
    font-size: 1rem
    div
      font-size: $font-size-medium-x
    &.cube-tab_active
      color: $color-theme
  .cube-tab-bar-slider
    background-color: $color-theme

.listview >>> .cube-tab-panels
  position: absolute
  top: 1.9rem
  left: 0
  right: 0
  bottom: 0
  overflow: hidden
  .cube-tab-panels-group
    height: 100%

.listview
  font-size: $font-size-medium
  .cube-tab-panels
    .cube-tab-panels-group
      width: 100%
      height: 100%
      .cube-tab-panel
        width: 100%
        height: 100%
        .scroll-wrapper
          height: 100%
          .city-list
            width: 100%
            height: 100%
            .area
              .tit
                box-sizing: border-box
                width: 100%
                height: .48rem
                line-height: .48rem
                color: #424242
                padding-left .3rem
              .cont
                box-sizing boder-box
                overflow hidden
                background #fff
                padding .2rem .6rem .2rem .2rem
                .cont-item
                  box-sizing border-box
                  width 33.33%
                  float left
                  padding .1rem
                  .cont-item-box
                    padding .1rem 0
                    width 100%
                    text-align center
                    border 1px solid #ccc
                    border-radius .1rem
          .cube-pulldown-wrapper
            transform: translateY(-100%)
            line-height: 0
            .pulldown-content
              width: 100%
              span
                position: absolute
                bottom: 15px
                left: 0
                right: 0
                margin: auto
                width: 200px
                text-align: center
                color: #eee
                font-size: 14px
  .list-shortcut
    position: fixed
    right: 0
    top: 2rem
    width: .5rem
    padding: 20px 0
    color: $color-theme
    text-align: center
    font-family: Helvetica
    .item
      padding: 3px
      line-height: 1
      color: $color-text-lll
      font-size: $font-size-small-s
      &.current
        color: $color-theme
</style>
