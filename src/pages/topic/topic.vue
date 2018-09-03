<template>
  <div class="topic">
    <common-header :title="title"></common-header>
    <filterbar @showSort="showSort"></filterbar>
    <cube-scroll  ref="scroll" 
                  class="product-list" 
                  :data="productList"
                  :options="options"
                  @pulling-up="onPullingUp"
                  :refreshDelay="1000">
      <div class="productlist-wrap">
        <list-view :list="productList" @selectScenic="selectScenic"></list-view>
      </div>
      <!--loading-->
      <div class="loading-container" v-show="!productList.length">
        <loading></loading>
      </div>
    </cube-scroll>
    <drop 
      :orderFilterList="orderFilterList"
      :sortFilter="sortFilter"
      :maskGroup="maskGroup"
      @selectSort="selectSort">
    </drop>
  </div>
</template>

<script>
import CommonHeader from 'base/common-header/common-header'
import ListView from 'base/listview/listview'
import Filterbar from './components/filterbar'
import Drop from './components/drop'
import Loading from 'base/loading/loading'
import { getTopic } from 'api/topic'
import { mapGetters, mapMutations } from 'vuex'

const sortNum = 62914527

export default {
  name: 'Topic',
  components: {
    CommonHeader,
    ListView,
    Filterbar,
    Drop,
    Loading
  },
  data() {
    return {
      title: '门票列表',
      productList: [],
      orderFilterList: [],
      options: {
        pullUpLoad: {
          threshold: 20,
          txt: {
            more: '加载更多',
            noMore: '没有数据'
          }
        }
      },
      page: 0,
      filterType: sortNum,
      filterId: 0,
      hasMore: true,
      sortFilter: false,
      maskGroup: false
    }
  },
  computed: {
    ...mapGetters([
      'cityId',
      'topicId'
    ])
  },
  watch: {
    topicId(newVal, oldVal) {
      if (newVal === oldVal) {
        return
      }
      this.filterType = sortNum
      this._initPage()
    }
  },
  mounted() {
    this.filterType = sortNum
    this._initPage()
  },
  methods: {
    onPullingUp() {
      setTimeout(() => {
        if (this.hasMore) {
          this.searchMore()
        } else {
          this.$refs.scroll.forceUpdate()
        }
      }, 1000)
    },
    searchMore() {
      this.page++
      getTopic(this.cityId, this.topicId, this.page, this.filterType, this.filterId).then((res) => {
        if (res.IsError === false) {
          this.productList = this.productList.concat(res.productList)
          this._checkMore(res)
        }
      })
    },
    showSort() {
      this.sortFilter = !this.sortFilter
      this.maskGroup = !this.maskGroup
    },
    selectSort(sortItem, index) {
      this.filterType = sortItem.filterDesc
      this.filterId = index
      this._initPage()
      this.showSort()
    },
    selectScenic(scenic) {
      this.$router.push({
        path: `/scenic/${scenic.scenicId}`
      })
      this.setScenicId(scenic.scenicId)
    },
    _getTopic(cityId, topicId, page, filterType, filterId) {
      getTopic(cityId, topicId, page, filterType, filterId).then((res) => {
        if (res.IsError === false) {
          this.productList = res.productList
          this.orderFilterList = res.orderFilterList
        }
      })
    },
    _checkMore(data) {
      const list = data.totalCount
      if ((this.page + 1) * 20 >= list) {
        this.hasMore = false
      }
    },
    _initPage() {
      this.page = 0
      this.hasMore = true
      this.$refs.scroll.scrollTo(0, 0, 100)
      this._getTopic(
        this.cityId,
        this.topicId,
        this.page,
        this.filterType,
        this.filterId
      )
    },
    ...mapMutations({
      setScenicId: 'SET_SCENICID'
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'

.topic
  position: fixed
  z-index: 100
  width: 100%
  top: 0
  bottom: 0
  background: #fff
  overflow: hidden
  .product-list
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    overflow: hidden
    .productlist-wrap
      margin-top: 1.7rem
  .loading-container
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
