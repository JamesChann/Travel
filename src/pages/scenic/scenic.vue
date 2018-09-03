<template>
  <div class="scenic">
    <div>
      <common-header title="景点门票"></common-header>
      <div class="scroll-wrapper" v-show="scenic.imageList">
        <cube-scroll  ref="scroll" 
                      class="scenic-list" 
                      :data="scenic.ticketList"
                      :refreshDelay="1000">
          <banner :scenic="scenic" @showGallery="showGallery"></banner>
          <Info :scenic="scenic" @selectToMap="selectToMap"></Info>
          <ticket :scenic="scenic"></ticket>
        </cube-scroll>
      </div>
      <gallery :list="scenic.imageList" @hideGallery="hideGallery" v-if="showBanner"></gallery>
      <maps :mapInfo="mapInfo" :title="title" v-if="showMap" @closeMap="closeMap"></maps>
      <!--loading-->
      <div class="loading-container" v-show="!scenic.imageList">
        <loading></loading>
      </div>
    </div>
  </div>
</template>

<script>
import CommonHeader from 'base/common-header/common-header'
import Banner from './components/banner'
import Info from './components/info'
import Ticket from './components/ticket'
import Gallery from 'base/gallery/gallery'
import Loading from 'base/loading/loading'
import Maps from 'pages/scenic-info/map'
import commit from 'pages/scenic-info/commit'
import { getScenic } from 'api/scenic'
import { mapGetters } from 'vuex'

export default {
  name: 'Scenic',
  components: {
    CommonHeader,
    Banner,
    Info,
    Ticket,
    Gallery,
    Loading,
    Maps,
    commit
  },
  data() {
    return {
      scenic: {},
      showBanner: false,
      showMap: false,
      mapInfo: {},
      title: ''
    }
  },
  created() {
    this.scenic = {}
    this._getScenic(this.scenicId)
  },
  activated() {
    this.scenic = {}
    this._getScenic(this.scenicId)
  },
  computed: {
    ...mapGetters([
      'scenicId'
    ])
  },
  methods: {
    showGallery() {
      this.showBanner = true
    },
    hideGallery() {
      this.showBanner = false
    },
    selectToMap(addressInfo, title) {
      this.mapInfo = addressInfo
      this.title = title
      this.showMap = true
    },
    closeMap() {
      this.showMap = false
    },
    _getScenic(scenicId) {
      getScenic(scenicId).then((res) => {
        if (res.IsError === false) {
          this.scenic = res
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.scroll-wrapper
  position: fixed
  top: .86rem
  left: 0
  right: 0
  bottom: 0
  overflow: hidden
.loading-container
  position: absolute
  width: 100%
  top: 50%
  transform: translateY(-50%)
</style>
