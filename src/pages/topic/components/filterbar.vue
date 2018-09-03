<template>
  <div class="filterbar">
    <div class="arrow-down">
      距离筛选<i class="iconfont icon-drop"></i>
    </div>
    <div class="arrow-down" @click="showSort">
      推荐排序<i class="iconfont icon-drop"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Filterbar',
  methods: {
    showSort() {
      this.$emit('showSort')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.filterbar
  display: flex
  justify-content: center
  align-items: center
  position: relative
  z-index: 120
  width: 100%
  height: .86rem
  border-bottom: 1px solid #ebebeb
  border-top: 1px solid #eee
  background: $color-background
  .arrow-down
    flex: 1
    text-align: center
    font-size: $font-size-medium
    .icon-drop
      margin-left: 5px
      color: #ccc
</style>
