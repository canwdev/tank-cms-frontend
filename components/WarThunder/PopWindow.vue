<template>
  <div v-show="show" class="window-bg">
    <div class="window-fg">
      <div class="window-title">
        <div class="title">{{ id }}</div>
        <div class="close" @click="closeWindow">
          <i class="icon iconfont icon-close"></i>
        </div>
      </div>
      <div class="window-content">
        main content: {{ id }}
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
        id: -1
      }
    },
    created() {
      const _this = this

      this.$bus.$on('showVehicleDetail', function(res) {
        console.log(res)
        _this.id = res
        _this.show = true
      })
    },
    methods: {
      closeWindow() {
        this.show = false
      }
    }
  }
</script>

<style lang="stylus">
  .window-bg
    position fixed
    z-index 200
    top 0
    right 0
    bottom 0
    left 0
    background rgba(0, 0, 0, 0.6)
    color #fff

    .window-fg
      position absolute
      z-index 201
      top 50%
      left 50%
      transform translate(-50%, -50%)
      width 800px
      color #fff
      background rgba(35, 38, 43, 0.836)
      border 1px solid #717171
      @media (max-width: 800px)
        max-width 100%

      .window-title
        height 40px
        line-height 40px
        display flex
        justify-content space-between
        background #2f3742
        border-bottom 1px solid #1c2632

        .title
          padding 0 10px
          font-weight bold

        .close
          width 40px
          text-align center

          .icon
            font-size 26px

          &:hover
            background #B2391D

          &:active
            background #7E382B

      .window-content
        padding 10px
        box-sizing border-box
        min-height 100px
        overflow auto
        display flex
</style>

