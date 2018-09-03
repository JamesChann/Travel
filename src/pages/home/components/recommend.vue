<template>
  <div class="home-recommend" v-if="recommendSceneryList.length">
    <div class="recommend-header">
      <i class="line"></i>
      <i class="point"></i>
      当地必玩
      <i class="point"></i>
      <i class="line"></i>
    </div>
    <list-view :list="recommendSceneryList" @selectScenic="selectScenic"></list-view>
  </div>
</template>

<script>
import ListView from 'base/listview/listview'

export default {
  name: 'HomeRecommend',
  components: {
    ListView
  },
  props: {
    recommendSceneryList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    selectScenic(scenic) {
      this.$emit('selectScenic', scenic)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.home-recommend
  width: 100%
  margin-top: $height-size-small
  background: $color-background
  margin-top: $height-size-small
  .recommend-header
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
</style>
