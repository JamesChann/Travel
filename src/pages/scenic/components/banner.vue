<template>
  <div class="banner-wrap">
    <div class="banner">
      <img :src="scenic.coverImage" class="banner-img" @click="showGallery">
      <div class="banner-info">
        <div class="info-title">{{ scenic.title }}</div>
        <div class="info-num" v-if="scenic.imageList">
          <span class="iconfont icon-num"></span>
          {{ scenic.imageList.length }}
        </div>
      </div>
    </div>
    <!-- <gallery :list="imgList" @hideGallery="hideGallery" v-if="showBanner"></gallery> -->
  </div>
</template>

<script>
export default {
  name: 'Banner',
  props: {
    scenic: {
      type: Object,
      default: {}
    }
  },
  computed: {
    imgList() {
      return this.scenic.imageList
    }
  },
  methods: {
    showGallery() {
      this.$emit('showGallery')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.banner-wrap
  overflow: hidden
  .banner
    position: relative
    overflow: hidden
    height: 0
    padding-bottom: 45.6%
    .banner-img
      width: 100%
    .banner-info
      display: flex
      position: absolute
      left: 0
      right: 0
      bottom: 0
      line-height: .6rem
      color: #fff
      background: linear-gradient(top, rgba(0,0,0,0), rgba(0,0,0,.8))
      .info-title
        flex: 1
        font-size: $font-size-medium
        padding: 0 .2rem
      .info-num
        margin-top: .14rem
        height: .32rem
        line-height: .32rem
        padding: 0 .4rem
        background: rbga(0, 0, 0, .8)
        border-radius: .2rem
        font-size: $font-size-medium
        .icon-num
          font-size: $font-size-medium
          padding-right: .1rem
</style>
