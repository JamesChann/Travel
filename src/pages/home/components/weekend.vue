<template>
  <div class="home-weekend">
    <div class="week-header">
      <i class="line"></i>
      <i class="point"></i>
      本周最热
      <i class="point"></i>
      <i class="line"></i>
    </div>
    <div class="week-cont">
      <div class="horizontal-scroll-list-wrap" v-if="weekHotList.length">
        <cube-scroll
          ref="scroll"
          direction="horizontal"
          :data="weekHotList">
          <ul class="list-wrapper">
            <li v-for="item in weekHotList" class="list-item" @click="selectScenic(item)">
              <div class="pic">
                <img class="pic-img" :src="item.imageUrl" @load="loadImage">
              </div>
              <div class="info">
                <span class="name">{{ item.scenicTitle }}</span>
                <div class="price">
                  <span class="number">￥{{ item.currentPrice }}</span>
                  <span class="txt">起</span>
                </div>
              </div>
            </li>
          </ul>
        </cube-scroll>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeWeekend',
  props: {
    weekHotList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
    }
  },
  methods: {
    loadImage() {
      setTimeout(() => {
        this.$refs.scroll.refresh()
      }, 20)
    },
    selectScenic(scenic) {
      this.$emit('selectScenic', scenic)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';
@import '~common/stylus/mixin.styl'

.horizontal-scroll-list-wrap >>> .cube-scroll-content
  display: inline-block
  overflow: hidden
  .cube-scroll-list-wrapper
    overflow: hidden

.home-weekend
  width: 100%
  margin-top: $height-size-small
  min-height: 3.86rem
  background: $color-background
  margin-top: $height-size-small
  .week-header
    display: flex
    justify-content: center
    align-items: center
    height: .86rem
    .line
      width: 48px
      height: 1px
      background: #ccc
    .point
      width: 2px
      height: 2px
      margin-left: 10px
      margin-right: 10px
      background: #000
  .week-cont
    .horizontal-scroll-list-wrap
      position: relative
      .cube-scroll-content
        display: inline-block
        .list-wrapper
          padding: 0 10px
          white-space: nowrap
          overflow: hidden
          .list-item
            display: inline-block
            margin-right: 10px
            width: 150px
            .pic
              width: 100%
              .pic-img
                width: 100%
            .info
              text-align: left
              padding-top: 10px
              padding-bottom: 10px
              .name
                width: 100%
                display: inline-block
                font-size: $font-size-medium-x
                no-wrap()
              .price
                padding-top: 8px
                .number
                  color: red
</style>
