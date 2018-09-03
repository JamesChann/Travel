<template>
  <div class="info">
    <div class="comment info-cont" @click="toCommit">
      <i class="iconfont icon-comment"></i>
      <span class="info-txt">游客评价：{{ scenic.commentScore }}分</span>
      <i class="iconfont icon-back"></i>
    </div> 
    <div class="map info-cont" v-if="scenic.address" @click="selectToMap(scenic.address, scenic.title)">
      <i class="iconfont icon-map"></i>
      <span class="info-txt">{{ scenic.address.addressDesc }}</span>
      <i class="iconfont icon-back"></i>
    </div> 
    <div class="special info-cont">
      <i class="iconfont icon-special"></i>
      <span class="info-txt">景点特色</span>
      <i class="iconfont icon-back"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Info',
  props: {
    scenic: {
      type: Object,
      default: {}
    }
  },
  methods: {
    selectToMap(addressInfo, title) {
      this.$emit('selectToMap', addressInfo, title)
    },
    toCommit() {
      this.$router.push({
        path: `/scenic/${this.scenic.sceneryId}/commit`
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.info
  background: #fff
  box-sizing: border-box
  .info-cont
    margin-left: 12px
    height: .88rem
    line-height: .88rem
    vertical-align: middle
    border-bottom: 1px solid rgb(235, 235, 235)
    .iconfont
      box-sizing: border-box
      color: $color-theme
      font-size: $font-size-large
      vertical-align: middle
      padding-right: 20px
    .info-txt
      display: inline-block
      width: 70%
      box-sizing: border-box
      vertical-align: middle
      font-size: $font-size-medium
      color: #333
      no-wrap()
    .icon-back
      display: inline-block
      float: right
      margin-right: 10px
      line-height: .88rem
      font-size: $font-size-small-s
      color: #000
      transform: rotate(180deg)
</style>
