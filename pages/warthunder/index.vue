<template>
  <client-only>
    <div class="war-thunder-wrap">
      <div class="bg-layer" :class="show_techtree?'bg-darken':''">
        <div class="bg-layer-item bg-video">
          <video :src="backgroundVideo" autoplay loop muted></video>
        </div>
        <div class="bg-layer-item bg-shadow"></div>
      </div>
      <div class="fg-wrap" @click="handleFgClick" @contextmenu.prevent="">
        <ObjectDetail></ObjectDetail>
        <ContextMenu></ContextMenu>
        <PopWindow></PopWindow>
        <SlideInUp>
          <MainMenu
            v-show="show_techtree"
            :tech-trees="wtData.tech_trees"
            @close="techTreeClose"
            @contextmenu.prevent=""
          ></MainMenu>
        </SlideInUp>
        <div class="bottom-wrap">
          <div class="menu-switch-bar">
            <button class="btn-menu-switch" :class="show_techtree?'':'closed'" @click="techTreeToggle">
              <span class="icon iconfont icon-down"></span>
              科技树
              <span class="icon iconfont icon-down"></span>
            </button>
          </div>
          <WtCountries :countries="wtData.countries"></WtCountries>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
  // import { getWTList } from '~/assets/src/api/warthunder'
  import { getPostDetail } from '~/assets/src/api/website'
  import SlideInUp from '~/components/Animation/SlideInUp'
  import MainMenu from '~/components/WarThunder/MainMenu'
  import ObjectDetail from '~/components/WarThunder/ObjectDetail'
  import ContextMenu from '~/components/WarThunder/ContextMenu'
  import PopWindow from '~/components/WarThunder/PopWindow'
  import WtCountries from '~/components/WarThunder/WtCountries'

  export default {
    components: {
      SlideInUp,
      MainMenu,
      ObjectDetail,
      ContextMenu,
      PopWindow,
      WtCountries
    },
    data: () => ({
      wtData: {},
      show_techtree: true,
      backgroundVideo: null
    }),
    mounted() {
      getPostDetail({ id: 43 }).then(res => {
        this.wtData = JSON.parse(res.data.content)
      }).catch(e => {
        console.error(e)
      })
    },
    methods: {
      techTreeToggle(bool) {
        this.show_techtree = !this.show_techtree
      },
      techTreeClose() {
        this.show_techtree = false
      },
      handleFgClick() {
        this.$bus.$emit('onFgClick')
      }
    }
  }
</script>

<style lang="stylus">
  @import "~/assets/styles/warthunder/iconfont/iconfont.css";

  .war-thunder-wrap
    *
      cursor: url("~assets/images/warthunder/cursor.png"), auto !important
      user-select none
      outline: 0

    ::-webkit-scrollbar-track
      background-color: rgba(35, 38, 43, 0.9)

    ::-webkit-scrollbar
      width: 10px
      height: 10px

    ::-webkit-scrollbar-thumb
      background-color: #9aaeac
      border-radius: 1px

</style>

<style lang="stylus" scoped>

  .bg-layer
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index -1
    background url('~assets/images/warthunder/main_bg.jpg') no-repeat center
    background-size cover

    .bg-layer-item
      width 100%
      height 100%

    .bg-video
      z-index 0
      transition all .05s

      video
        width 100%
        height 100%
        object-fit cover

    .bg-shadow
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      transition all .5s

    &.bg-darken
      .bg-shadow
        background rgba(0, 0, 0, 0.35)
        backdrop-filter: blur(1px);

  .fg-wrap
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index 1

  .bottom-wrap
    position absolute
    bottom 0
    left 50%
    transform translateX(-50%)
    width 100%
    max-width 95%
    min-height 134px
    background-color rgba(32, 39, 48, 0.9)
    border 1px solid #1c2632
    border-bottom 0
    color #fff
    display flex
    flex-direction column

    @media (max-width: 800px)
      max-width 100%

  .menu-switch-bar
    height 25px
    width 100%
    position relative
    background rgba(35, 38, 43, 0.836)

    .btn-menu-switch
      display flex
      justify-content space-between
      position absolute
      bottom 5px
      left 6px
      background #404f56
      border none
      border-top 2px solid #9aaeac
      color #b8c2c4
      line-height 20px
      height 25px
      min-width 173px

      &.closed .icon
        transform rotate(180deg)

      &:hover
        background #5a717b
        border-top 2px solid #b0c5c3

      &:active
        background #404f56
        border-top 2px solid #9aaeac
</style>
