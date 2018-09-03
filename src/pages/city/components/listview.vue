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
            >
              <!--当前位置-->
              <div class="area">
                <div class="tit">所选城市</div>
                <div class="cont">
                  <div class="cont-item">
                    <div class="cont-item-box">{{ currentCity }}</div>
                  </div>
                </div>
              </div>
              <!--热门城市-->
              <div class="area" v-if="hotCitys.length">
                <div class="tit">热门城市</div>
                <div class="cont">
                  <div class="cont-item"
                      v-for="(hotcity, index) in item.hotcitys"
                      :key="index"
                      @click="selectCity(hotcity)"
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
                <div class="cont" v-for="(innerItem, index) of allcity.cityList" :key="index" @click="selectCity(innerItem)">
                    {{ innerItem.cityName }}
                </div>
              </div>
            </cube-scroll>
          </div>
        </cube-tab-panel>
      </cube-tab-panels>
    <!--loading-->
    <div class="loading-container" v-show="!allCitys.length">
      <loading></loading>
    </div>
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
import { mapGetters } from 'vuex'
import Loading from 'base/loading/loading'

const DOMESTIC = '国内城市'
const OVERSEAS = '海外城市'
const ANCHOR_HEIGHT = 18

export default {
  name: 'ListView',
  components: {
    Loading
  },
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
      selectedLabel: DOMESTIC,
      tabs: [{
        label: DOMESTIC,
        hotcitys: [],
        allcitys: {}
      }, {
        label: OVERSEAS,
        hotcitys: [],
        allcitys: {}
      }],
      anchorList: [],
      flag: false,
      labelFlag: DOMESTIC,
      scrollY: 0,
      options: {
        bounce: {
          top: false,
          bottom: false
        },
        click: true
      }
    }
  },
  computed: {
    currentCity() {
      return this.cityName === '' ? '杭州' : this.cityName
    },
    ...mapGetters([
      'cityId',
      'cityName'
    ])
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
      this.anchorList = this.label === DOMESTIC ? this.allCitys : this.allSug
    },
    selectCity(city) {
      this.$emit('select', city)
      this.$router.push({
        path: '/'
      })
    },
    onScrollHandle(pos) {
      this.scrollY = pos.y
    },
    onShortcutTouchStart(e) {
      let anchorIndex = getData(e.target, 'index')
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    onShortcutTouchMove(e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta
      this._scrollTo(anchorIndex)
    },
    _scrollTo(index) {
      if (this.labelFlag === '') {
        this.$refs.scroll[0].scrollToElement(this.$refs.listGroup[index], 0)
      } else if (this.labelFlag === DOMESTIC) {
        this.$refs.scroll[0].scrollToElement(this.$refs.listGroup[index], 0)
      } else if (this.labelFlag === OVERSEAS) {
        let overseas = parseInt(index) + 22
        this.$refs.scroll[1].scrollToElement(this.$refs.listGroup[overseas], 0)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'

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
            .fix-title-cont
              position: absolute
              top: 0
              left: 0
              right: 0
              .fix-title
                height: 30px
                line-height: 30px
                padding-left: 20px
                color: $color-text-l
                background: $color-highlight-background
                font-size: $font-size-small
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
  .loading-container
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
