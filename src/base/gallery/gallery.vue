<template>
  <transition name="slide">
    <div class="gallery" @click="hideGallery">
      <div class="wrap">
        <cube-slide :data="list" ref="slide" :loop="false" :auto-play="false">
          <cube-slide-item v-for="(item, index) in list" :key="index">
            <img class="gallery-img" v-lazy="item" @load="loadImage">
          </cube-slide-item>
          <template slot="dots" slot-scope="props">
            <span>{{ props.current + 1 }}/{{ props.dots.length }}</span>
          </template>
        </cube-slide>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Gallery',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
    }
  },
  methods: {
    hideGallery() {
      this.$emit('hideGallery')
    },
    mounted() {
      this.$refs.slide.refresh()
    },
    loadImage() {
    }
  }
}
</script>

<style lang="stylus" scoped>
.cube-slide >>> .cube-slide-group
  width: 100%
  .cube-slide-item
    width: 100%
    overflow: hidden

.cube-slide >>> .cube-slide-dots > span
  height: 14px
  background: transparent
  color: #fff

.gallery
  display: flex
  flex-direction: column
  justify-content: center
  position: fixed
  top: -.86rem
  left: 0
  right: 0
  bottom: 0
  background: #000
  z-index: 130
  overflow: hidden
  .wrap
    width: 100%
    .gallery-img
      height: 300px
      .show
        display: inline-block
      .hide
        display: none
.slide-enter-active, .slide-leave-active
  transition: all 0.3s
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
</style>
