<template>
  <div class="search" v-show="query">
    <div class="scroll-list-wrap">
      <cube-scroll :data="list" ref="scroll" :options="options">
        <ul>
          <li class="search-item border-bottom" v-for="(item, index) in list" :key="index" @click="selectCity(item)">
            {{ item.cityName }}
          </li>
        </ul>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    query: {
      type: String,
      default: ''
    },
    citys: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      list: [],
      timer: null,
      options: {
        bounce: {
          top: false,
          bottom: false
        }
      }
    }
  },
  watch: {
    query() {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        const result = []
        this.citys.forEach((item) => {
          item.cityList.forEach((item) => {
            if ((item.cityName).indexOf(this.query) > -1) {
              result.push(item)
            }
          })
        })
        this.list = result
      }, 15)
    }
  },
  methods: {
    selectCity(city) {
      this.$emit('select', city)
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~common/stylus/variable.scss';

.search {
  position: fixed;
  width: 100%;
  top: 1.06rem;
  bottom: 0;
  z-index: 100;
  overflow: hidden;
  background: $color-background;
  .scroll-list-wrap {
    height: 100%;
    .search-item {
      padding: .2rem .6rem .2rem .2rem;
      color: #666;
    }
  }
}
</style>
