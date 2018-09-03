<template>
  <transition name="slide">
    <div class="commit">
      <common-header title="游客评论"></common-header>
      <div class="wrap" v-show="commentList">
        <cube-scroll :data="commentList">
          <div class="score">
            <span class="score-text">综合评分:</span>
            <span class="num-info"><i class="num">{{ score }}</i>分</span>
          </div>
          <div class="filter">
            <ul class="filter-list">
              <li class="filter-item" v-for="item in filterItemList">
                <span class="item-filter">{{ item.filterDesc }}</span>
                <span class="item-extra">{{ item.extraDesc }}</span>
              </li>
            </ul>
          </div>
          <div class="content">
            <ul class="cont-list">
              <li class="cont-item" v-for="item in commentList">
                <div class="top">
                  <div class="left">
                    <span class="circle">{{ _pad(item.score) }}</span>
                    <span class="userName">{{ item.userName }}</span>
                  </div>
                  <div class="right">
                    <span class="date">{{ _formalTime(item.commentTime) }}</span>
                  </div>
                </div>
                <p class="cont-desc">{{ item.content }}</p>
                <div class="cont-piao">{{ item.productType }} {{ item.productName }}</div>
                <div class="imageList" v-show="item.imageUrlList">
                  <ul class="img-ul">
                    <li class="img-item" v-for="img in item.imageUrlList">
                      <img class="img-pic" :src="img">
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </cube-scroll>
      </div>
      <!--loading-->
      <div class="loading-container" v-show="!commentList">
        <loading></loading>
      </div>
    </div>
  </transition>
</template>

<script>
import CommonHeader from 'base/common-header/common-header'
import Loading from 'base/loading/loading'
import { getCommit } from 'api/scenic'
import { mapGetters } from 'vuex'

export default {
  name: 'Commit',
  components: {
    CommonHeader,
    Loading
  },
  data() {
    return {
      pageIndex: 1,
      filterItemList: [],
      commentList: [],
      score: 0
    }
  },
  computed: {
    ...mapGetters([
      'scenicId'
    ])
  },
  created() {
    this._getCommit(this.scenicId, this.pageIndex)
  },
  methods: {
    _getCommit(sceneryId, pageIndex) {
      getCommit(sceneryId, pageIndex).then((res) => {
        this.filterItemList = res.filterItemList
        this.commentList = res.commentList
        this.score = res.score
      })
    },
    _pad(num) {
      return num < 10 ? num + '.0' : num
    },
    _formalTime(needtime) {
      let time = new Date(needtime)
      let year = time.getFullYear()
      let month = time.getMonth() + 1
      let date = time.getDate()
      return year + '/' + month + '/' + date
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.commit
  position: fixed
  width: 100%
  top: 0
  bottom: 0
  z-index: 130
  background: #fff
  .wrap
    position: fixed
    top: .86rem
    bottom: 0
    width: 100%
    overflow: hidden
    .score
      width: 100%
      height: .86rem
      line-height: .86rem
      padding-left: 10px
      border-bottom: 1px solid #ebebeb
      .score-text
        color: #333
        font-size: $font-size-medium
      .num-info
        color: #f55
        font-size: $font-size-medium
        margin-left: 10px
        .num
          font-size: $font-size-large-x
          font-style: normal
          font-weight: 700
    .filter
      width: 100%
      padding: 10px
      box-sizing: border-box
      border-bottom: 1px solid #ebebeb
      .filter-list
        display: flex
        flex-wrap: wrap
        justify-content: flex-start
        .filter-item
          padding: 6px
          background: #f4f4f4
          border-radius: 6px
          margin-right: 8px
          margin-bottom: 8px
          .item-filter
            color: #333
            margin-right: 3px
          .item-extra
            color: #858585
    .content
      width: 100%
      .cont-list
        width: 100%
        .cont-item
          display: flex
          flex-direction: column
          padding: 10px
          border-bottom: 1px solid #ebebeb
          .top
            display: flex
            justify-content: space-between
            align-items: center
            .left
              display: flex
              align-items: center
              .circle
                width: 33px
                height: 33px
                color: #ff5555
                display: flex
                justify-content: center
                align-items: center
                border: 1px solid #ff5555
                border-radius: 50%
              .userName
                margin-left: 10px
                color: #333
            .right
              .date
                color: #b2b2b2
          .cont-desc
            margin-top: 10px
            color: #333
            font-size: $font-size-medium
            line-height: 18px
          .cont-piao
            color: #858585
            font-size: $font-size-small
            margin-top: 5px
            line-height: 20px
          .imageList
            width: 100%
            margin-top: 5px
            .img-ul
              display: flex
              .img-item
                width: 81px
                height: 81px
                margin-right: 8px
                .img-pic
                  width: 81px
                  height: 81px
.slide-enter-active, .slide-leave-active
  transition: all 0.3s
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
</style>
