<template>
  <div class="home-icons">
    <div class="scroll-list-wrap">
      <cube-slide ref="scroll" :data="iconList" :loop="false" :showDots="false" :autoPlay="false">
        <cube-slide-item v-for="(page, index) in pages" :key="index">
          <div class="icon" v-for="item of page" @click="selectIcon(item)">
            <div class="icon-item">
              <img class="icon-img" :src="item.topicUrl">
            </div>
            <p class="icon-desc">{{ item.topicName }}</p>
          </div>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeIcons',
  props: {
    iconList: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    pages () {
      const pages = []
      this.iconList.forEach((item, index) => {
        const page = Math.floor(index / 8)
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(item)
      })
      return pages
    }
  },
  methods: {
    selectIcon(topic) {
      this.$emit('select', topic)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.home-icons
  overflow: hidden
  background: $color-background
  max-height: 3.4rem
  .scroll-list-wrap
    height: 100%
    .icon
      overflow: hidden
      width: 25%
      float: left
      padding-bottom: 10px
      .icon-item
        width: 100%
        display: flex
        justify-content: center
        align-items: center
        .icon-img
          width: 30%
          margin: 0 auto
          padding: 10px 0
      .icon-desc
        text-align: center
</style>
