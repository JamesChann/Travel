<template>
  <div class="recommend-cont">
    <ul class="list">
      <li class="list-item border-bottom" v-for="item in list" @click="selectScenic(item)">
        <div class="item-pic">
          <img class="pic-img" :src="item.imageUrl">
        </div>
        <div class="item-text">
          <span class="title">{{ item.scenicTitle }}</span>
          <span class="desc">{{ item.scenicDesc }}</span>
          <div class="info">
            <span class="city">{{ item.scenicCity }}</span>
            <span class="score">{{ item.scenicCommentScore }}分</span>
            <span class="level">{{ item.scenicLevel }}A级风景区</span>
          </div>
          <span class="distance">{{ item.distanceDesc }}</span>
          <div class="price">
            <span class="kind" v-show="item.topicList.length">{{ item.topicList[0] }}</span>
            <div class="price-cont">
              <i class="money">￥</i>
              <i class="realprice">{{ item.currentPrice }}</i>
              <i class="qi">起</i>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ListView',
  props: {
    list: {
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

.recommend-cont
  // padding: 0 .2rem
  height: 100%
  .list
    height: 100%
    .list-item
      display: flex
      padding: 15px .2rem
      background-color: #fff
      .item-pic
        width: 100px
        .pic-img
          width: 100%
      .item-text
        flex: 1
        display: flex
        box-sizing: border-box
        padding-left: 10px
        flex-direction: column
        justify-content: space-between
        .title
          font-size: $font-size-medium-x
          color: #333
          font-weight: bold
        .desc
          color: #888
          font-size: $font-size-medium
        .info
          font-size: $font-size-small
          color: #b2b2b2
          .score
            color: $color-text-tip
        .distance
          font-size: $font-size-small
          color: #b2b2b2
        .price
          display: flex
          .kind
            display: flex
            align-items: center
            padding-left: 1px
            padding-right: 1px
            padding-top: 3px
            box-align: center
            font-size: $font-size-small-s
            color: #4499ff
            border: 1px solid #4499ff
          .price-cont
            flex: 1
            display: flex
            align-items: baseline
            justify-content: flex-end
            .money
              color: #ff5555
              font-size: $font-size-small
              font-style: normal
            .realprice
              color: #ff5555
              font-size: $font-size-large
              line-height: 18px
              font-weight: bold
              font-style: normal
            .qi
              color: #b2b2b2
              font-size: $font-size-small
              font-style: normal
</style>
