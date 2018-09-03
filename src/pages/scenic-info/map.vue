<template>
  <transition name="slide">
    <div class="maps">
      <div class="close" @click="closeMap">
        <i class="iconfont icon-close"></i>
      </div>
      <!--地图控件-->
      <el-amap vid="amap" class="amap-map" :plugin="plugin" :center="center" :zoom="zoom">
        <!--添加标记点-->
        <el-amap-marker vid="marker" :position="center" :label="label">
        </el-amap-marker>
        <!--添加圆形区域-->
        <el-amap-circle vid="circle" :center="center" :radius="radius"
          fill-opacity="0.2"
          strokeColor="#38f"
          strokeOpacity="0.8"
          strokeWeight="1"
          fillColor="#38f">
        </el-amap-circle>
      </el-amap>
      <div class="footer">
        <div class="poi-info">
          <div class="poi-title">
            <span class="title">{{ title }}</span>
            <span class="desc">{{ mapInfo.addressDesc }}</span>
          </div>
          <div class="poi-tab">
            查看周边
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Maps',
  props: {
    mapInfo: {
      type: Object,
      default: {}
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      center: [this.mapInfo.googleLon, this.mapInfo.googleLat],
      lng: this.mapInfo.googleLon,
      lat: this.mapInfo.googleLat,
      zoom: 19,
      label: {
        content: this.mapInfo.addressDesc,
        offset: [18, -20]
      },
      radius: 100,
      plugin: [
        {
          pName: 'ToolBar', // 工具条插件
          position: 'LB'
        },
        // {
        //   pName: 'MapType', // 卫星与地图切换
        //   defaultType: 0,
        //   showTraffic: true, // 实时交通图层
        //   position: 'LT'
        // },
        {
          pName: 'OverView',
          isOpen: true  // 鹰眼是否打开
        },
        {
          pName: 'Scale'
        }
      ]
    }
  },
  methods: {
    closeMap() {
      this.$emit('closeMap')
    },
    addRadius() {
      this.radius += 10
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.maps
  position: fixed
  z-index: 9999
  width: 100%
  top: 0
  left: 0
  right: 0
  bottom: 0
  background: #FFF
  .close
    position: absolute
    right: 15px
    top: 15px
    z-index: 100
    .icon-close
      color: #424242
      font-weight: 700
      font-size: $font-size-large
  .amap-map
    width: 100%
    height: 80%
  .footer
    width: 100%
    height: 20%
    .poi-info
      display: flex
      flex-direction: column
      height: 100%
      .poi-title
        display: flex
        flex-direction: column
        padding: 18px
        border-bottom: 1px solid rgba(0, 0, 0, 0.1)
        .title
          font-size: $font-size-large
          color: #111
        .desc
          font-size: $font-size-small
          color: #666
          margin-top: 8px
      .poi-tab
        display: flex
        flex: 1
        justify-content: center
        align-items: center
.slide-enter-active, .slide-leave-active
  transition: all 0.3s
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
</style>
