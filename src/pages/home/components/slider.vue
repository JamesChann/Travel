<template>
  <div class="home-slider">
    <cube-slide ref="slide" :data="sliders">
      <cube-slide-item v-for="(item, index) in sliders" :key="index">
        <a class="slider-link" :href="item.url">
          <img width="100%" height="300px" class="slider-img" :src="item.image">
        </a>
      </cube-slide-item>
    </cube-slide>
  </div>
</template>

<script>
export default {
  name: 'HomeSlider',
  props: {
    sliders: {
      type: Array,
      default: () => []
    }
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'

.home-slider >>> .cube-slide-dots
  bottom: 10px
.home-slider >>> .cube-slide-dots>span
  width: 8px
  height: 8px
  margin: 0 3px
  border-radius: 50%
  background: #ccc
.home-slider >>> .cube-slide-dots>span.active
  width: 18px
  border-radius: 9px
  background: $color-background

.home-slider
  width: 100%
  overflow: hidden
  .cube-slide
    .cube-slide-group
      .cube-slide-item
        height: 100%
</style>
