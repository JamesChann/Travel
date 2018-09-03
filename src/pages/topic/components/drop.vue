<template>
  <div class="drop">
    <transition name="slide">
      <div class="filter" v-show="sortFilter">
        <div class="filter-cont">
          <ul class="filter-list">
            <li class="filter-item border-bottom" 
                v-for="(item, index) in orderFilterList" 
                @click="sortList(item, index)"
                :class="{'active':currentIndex===index}">
              {{ item.filterDesc }}
              <i class="iconfont icon-ok" v-show="currentIndex===index"></i>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <div class="mask" v-show="maskGroup">
      <div class="bg"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Drop',
  props: {
    orderFilterList: {
      type: Array,
      default: () => []
    },
    sortFilter: {
      type: Boolean,
      default: false
    },
    maskGroup: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    sortList(sortTxt, index) {
      this.currentIndex = index
      this.$emit('selectSort', sortTxt, index)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
.drop
  .filter
    position: absolute
    background: #fff
    height: 250px
    top: 1.64rem
    left: 0
    right: 0
    z-index: 1000
    overflow: hidden
    border-top: 1px solid #ebebeb
    .filter-cont
      padding: .5px .4rem
      .filter-list
        .filter-item
          position: relative
          height: 35px
          line-height: 35px
          font-size: 12px
          &.active
            color: $color-theme
          .icon-ok
            position: absolute
            right: 8px
            top: 50%
            transform: translateY(-50%)
  .mask
    position: absolute
    top: 82px
    bottom: 0
    left: 0
    right: 0
    z-index: 990
    .bg
      width: 100%
      height: 100%
      background-color: rgba(0,0,0,.6)
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    height: 0
</style>
