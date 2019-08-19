<template>
  <div
    v-show="show"
    ref="menu_elem"
    class="context-menu"
    :class="reverse?'reverse':''"
    :style="'top:'+y+'px;left:'+x+'px'"
  >
    <div class="red-line"></div>
    <div class="item"><i class="icon iconfont icon-ammo"></i>改装</div>
    <div class="item" @click="onShowVehicle"><i class="icon iconfont icon-paintcan"></i>预览载具</div>
    <div class="item" @click="onShowIntro"><i class="icon iconfont icon-info2"></i><span class="link">介绍</span></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
        id: -1,
        mx: 0,
        my: 0,
        width: 0,
        height: 0,
        reverse: false,
        reverse_y: 0
      }
    },
    computed: {
      x() {
        return this.mx - (this.width / 2)
      },
      y() {
        let y = this.my - this.height
        if (y < 0) {
          this.reverse = true
          y = this.reverse_y
        } else {
          this.reverse = false
        }
        return y
      }
    },
    mounted() {
      const _this = this

      this.$bus.$on('objContextMenu', function(position, id) {
        _this.updateHW()
        // 解决第一次HW都为零的问题
        setTimeout(_this.updateHW, 1)
        _this.mx = position.x
        _this.my = position.y
        _this.id = id
        _this.show = true
        _this.reverse_y = position.card_y + position.card_height
      })

      this.$bus.$on('onFgClick', function() {
        _this.show = false
      })
    },
    methods: {
      onShowIntro() {
        this.$bus.$emit('showVehicleDetail', this.id)
      },
      onShowVehicle() {
        // this.$bus.$emit('showVehicleModel', this.id)
      },
      updateHW() {
        const t_elem = this.$refs.menu_elem
        this.width = t_elem ? this.$refs.menu_elem.offsetWidth : 0
        this.height = t_elem ? this.$refs.menu_elem.offsetHeight : 0
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .context-menu
    position fixed
    top 10px
    left 10px
    background #13181e
    color #fcffff
    box-sizing border-box
    z-index 100
    border 1px solid #41484e
    width 146px
    font-size 16px
    padding 1px
    display flex
    flex-direction column

    .icon
      margin-right 4px

    .item
      line-height 36px
      padding 0 10px

      &:hover
        background rgba(255, 255, 255, 0.32)

      &:active
        background rgba(255, 255, 255, 0.1)

    .link
      display inline-block
      text-decoration underline
      color #20c3fa

    .red-line
      display block
      content ''
      height 4px
      width 95%
      background #612934
      margin 5px auto 2px

    &:before, &:after
      position absolute
      bottom -19px
      left 50%
      transform translateX(-50%)
      display block
      content ''
      width 0
      height 0
      border-width 10px
      border-style solid
      border-color #13181e transparent transparent transparent

    &:before
      bottom -20px
      border-color #41484e transparent transparent transparent

    &.reverse
      flex-direction column-reverse

    &.reverse:before, &.reverse:after
      bottom 0
      top -19px
      border-color transparent transparent #13181e transparent

    &.reverse:before
      bottom 0
      top -20px
      border-color transparent transparent #41484e transparent
</style>
