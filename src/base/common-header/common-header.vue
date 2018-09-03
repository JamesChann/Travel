<template>
  <div class="common-header">
    <div class="back" @click="back">
      <i class="iconfont icon-back"></i>
    </div>
    <div class="title">{{ title }}</div>
  </div>
</template>

<script>
export default {
  name: 'CommonHeader',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    back() {
      this.$router.back()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.common-header
  width: 100%
  height: .86rem
  line-height: .86rem
  position: relative
  z-index: 120
  background: $color-header-nav
  text-align: center
  .back
    position: absolute
    top: 50%
    transform: translateY(-50%)
    left: 10px
    .icon-back
      font-size: $font-size-large
      display: block
      color: $color-header-text
  .title
    width: 100%
    font-size: $font-size-large
    font-weight: bold
    color: $color-text-f
</style>
