<template>
  <div class="home-special">
    <div class="special-cont" v-for="item in specialSubjectList">
      <div class="cont-txt">
        <p class="mainTitle">{{ item.mainTitle }}</p>
        <p class="subTitle">{{ item.subTitle }}</p>
      </div>
      <img :src="item.jumpUrl" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeSpecial',
  props: {
    specialSubjectList: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.home-special
  width: 100%
  overflow: hidden
</style>
