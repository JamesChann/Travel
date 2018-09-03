<template>
  <div class="ticket">
    <div class="ticket-cont" v-for="tickets in scenic.ticketList">
      <div class="header">
        <h2 class="title">
          <span class="line"></span>
          <span class="tit-cont">{{ tickets.key }}</span>
        </h2>
      </div>
      <div class="ticket-list">
        <ul>
          <li class="list-item" v-for="item in tickets.value">
            <div class="item-left">
              <span class="titel">{{ item.title }}</span>
              <div class="notice">
                <span class="boobkingNotice">{{ item.boobkingNotice }}</span>
                <span class="typeDesc" v-for="tag in item.showTags">{{ tag }}</span>
              </div>
              <span class="rules">购票须知</span>
            </div>
            <div class="item-right">
              <div class="price-cont">
                <del class="originalPrice">￥{{ item.originalPrice }}</del>
                <span class="currentPrice">￥{{ item.currentPrice }}</span>
              </div>
              <img class="book-pic" src="~common/images/book_online.png">
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ticket',
  props: {
    scenic: {
      type: Object,
      default: {}
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.ticket
  background: #f4f4f4
  .ticket-cont
    width: 100%
    padding-top: 10px
    .header
      width: 100%
      height: .86rem
      line-height: .86rem
      padding: 0 14px
      background: #fff
      .title
        font-size: $font-size-medium
        color: #333
        .line
          display: inline-block
          width: 3px
          height: 13px
          margin-right: 8px
          vertical-align: middle
          background: #4499ff
        .tit-cont
          vertical-align: middle
          font-size: $font-size-medium
    .ticket-list
      .list-item
        display: flex
        padding: 12px
        background-color: #f4f4f4
        .item-left
          width: 70%
          .titel
            font-size: $font-size-medium
            color: #333
          .notice
            display: flex
            margin-top: 7px
            .boobkingNotice
              display: flex
              align-items: center
              font-size: $font-size-small
              line-height: $font-size-small
              color: #858585
              vertical-align: middle
            .typeDesc
              display: flex
              min-width: 40px
              font-size: $font-size-small-s
              color: #4499ff
              border: 1px solid #4499ff
              height: 16px
              line-height: 16px
              margin-left: 5px
              padding-left: 1px
              padding-right: 1px
              overflow: hidden
              text-overflow: ellipsis
              white-space: nowrap
              align-items: center
              justify-content: center
              vertical-align: middle
          .rules
            display: inline-block
            margin-top: 15px
            font-size: $font-size-small
            color: #4499ff
        .item-right
          flex: 1
          display: flex
          flex-direction: column
          align-items: flex-end
          .price-cont
            display: flex
            .originalPrice
              display: flex
              justify-content: center
              align-items: center
              font-size: $font-size-small-s
              color: #b2b2b2
            .currentPrice
              font-size: $font-size-large
              color: #ff5555
              margin-left: 6px
          .book-pic
            width: 40px
            height: 40px
            margin-top: 10px
</style>
