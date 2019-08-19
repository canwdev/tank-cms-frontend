<template>
  <div class="obj-card" :class="obj_status" @contextmenu.prevent="onContextMenu" @mousemove="objHover" @mouseleave="objHoverOut">
    <div class="bgfx-layer">
      <!-- <img class="small-img" src="~/assets/images/warthunder/tank_t34.png"> -->
      <img class="small-img" :src="obj.icon_img_url">
      <span class="name">{{ obj.name }}</span>
      <span class="battle_lv">{{ obj.battle_lv == 0 ? "初始": obj.battle_lv }}
        <i class="icon iconfont icon-light" :class="map_vehicle_type[obj.vehicle_type]"></i>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      obj: Object
    },
    data() {
      return {
        active: false,
        map_vehicle_type: {
          '1': 'light',
          '2': 'medium',
          '3': 'heavy',
          '4': 'destoryer',
          '5': 'aag'
        }
      }
    },
    computed: {
      obj_status() {
        // :class="[ obj.pro?'pro':'', obj.dev?'dev':'' ]"
        let classes = ''
        if (this.obj.pro) {
          classes += 'pro '
        }
        if (this.obj.dev) {
          classes += 'dev '
        }
        if (this.active) {
          classes += 'active '
        }
        return classes
      }
    },
    mounted() {
      const _this = this

      this.$bus.$on('onFgClick', function() {
        _this.active = false
      })
    },
    methods: {
      onContextMenu(e) {
        this.$bus.$emit('onFgClick')
        this.active = true

        let card_x = 0
        let card_y = 0
        let card_width = 0
        let card_height = 0

        // 定位obj-card
        for (const i in e.path) {
          if (e.path[i]._prevClass.indexOf('obj-card') != -1) {
            card_x = this.getOffset(e.path[i]).left
            card_y = this.getOffset(e.path[i]).top
            card_width = e.path[i].offsetWidth
            card_height = e.path[i].offsetHeight
            break
          }
        }

        const position = {
          x: card_x + (card_width / 2),
          y: card_y,
          card_x,
          card_y,
          card_width,
          card_height
        }
        this.$bus.$emit('objContextMenu', position, this.obj.id)
      },
      objHover(e) {
        const send = {
          x: e.x,
          y: e.y,
          id: this.obj.id
        }
        // 向bus发送一个事件和一个参数，这样在任何vue实例中写了这个事件的监听器，都能接收到这个事件
        this.$bus.$emit('objHover', send, this.obj)
      },
      objHoverOut() {
        this.$bus.$emit('objHoverOut')
      },
      // 获得绝对top坐标
      getOffsetTop(el) {
        return el.offsetParent
          ? el.offsetTop + this.getOffsetTop(el.offsetParent)
          : el.offsetTop
      },
      // 似乎有bug
      getOffsetLeft(el) {
        return el.offsetParent
          ? el.offsetLeft + this.getOffsetLeft(el.offsetParent)
          : el.offsetLeft
      },
      // 完美：https://stackoverflow.com/a/28222246
      getOffset(el) {
        const rect = el.getBoundingClientRect()
        return {
          left: rect.left + window.scrollX,
          top: rect.top + window.scrollY
        }
      }
    }
  }
</script>

<style lang="stylus">
  .obj-card
    position relative
    border 1px solid #000
    border-radius 2px
    height 56px
    // background linear-gradient(to bottom, #10252a 0%, #304653 100%)
    background url("~assets/images/warthunder/obj_card_bg.png") repeat-x
    background-size contain
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25);
    &:active, &.active
      outline 2px solid #f6da48
    .bgfx-layer
      overflow hidden
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      z-index 0
      display flex
      flex-direction column
      text-align right
      box-sizing border-box
      padding 5px
    &.pro
      background url("~assets/images/warthunder/obj_card_bg_pro.png") repeat-x
      background-size contain
      &::before
        z-index 2
        font-family: "iconfont" !important;
        content "\e62e"
        text-align center
        color #bd923d
        position absolute
        height 20px
        width 20px
        top -10px
        left 50%
        transform translateX(-50%)
        text-shadow: 0 0 2px rgba(0,0,0,0.6);
    &:hover
      .bgfx-layer::after
        z-index 0
        content ""
        position absolute
        height 10px
        left 0
        right 0
        bottom -15px
        box-shadow 0 0 50px 10px #b7969d
        border-radius 50%
    &.dev
      .bgfx-layer::before
        z-index 0
        content ""
        position absolute
        height 10px
        left 0
        right 0
        bottom -15px
        box-shadow 0 0 50px 10px #bd923d
        border-radius 50%
        animation blink 3s linear infinite
    .small-img
      position absolute
      z-index 1
      // width 45px
      height 45px
    .name
      z-index 2
      text-shadow 0 0 7px #000
    .battle_lv
      font-size 12px
      z-index 2
      .icon
        font-size 10px
        &.light
          color #fff
        &.medium
          color #f5a9b3
        &.heavy
          color #e95166
        &.destroyer
          color #b5e6af
        &.aag
          color green
</style>
