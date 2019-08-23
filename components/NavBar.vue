<template>
  <div class="global-nav-wrap">
    <div class="global-nav" :class="{fixed: isFixed}">
      <div class="w-container" :class="{open: openMenu}">
        <NLink to="/" class="logo-wrap">
          <img src="~/assets/images/icons/avatar.jpg">
          <p>{{ BLOG_NAME }}</p>
        </NLink>

        <div ref="linksWrap" class="links-wrap" :class="{open: openMenu}">
          <NLink to="/">首页</NLink>
          <NLink to="/warthunder">WarThunder UI</NLink>
          <a href="###">分类</a>
          <NLink to="/posts/1">关于</NLink>
        </div>

        <div class="mobile-menu-shade" :class="{open: openMenu}" @click="openMenu = false"></div>

        <div class="mobile-menu">
          <button class="btn-openmenu" :class="{active: openMenu}" @click="toggleOpenMenu"></button>
        </div>
      </div>
    </div>
    <div class="nav-height-placeholder"></div>
  </div>
</template>

<script>
  import { BLOG_NAME } from '~/nuxt.config'

  export default {
    data: () => ({
      BLOG_NAME,
      isFixed: false,
      openMenu: false
    }),
    watch: {
      openMenu(nv, ov) { // 辅助CSS完整展开收缩动画
        if (nv) {
          this.$refs.linksWrap.style.height = this.linksWrapHeight + 'px'
        } else {
          this.$refs.linksWrap.style.height = 0
        }
      }
    },
    mounted() {
      // 点击链接滚动到顶部
      let links = this.$refs.linksWrap.children
      links = Array.prototype.slice.call(links)
      // 用于css height transition动画
      this.linksWrapHeight = 0
      links.forEach((v) => {
        this.linksWrapHeight += v.clientHeight
        v.addEventListener('click', () => {
          this.closeMenu()
          window.scrollTo(0, 0)
        })
      })

      this.updateNavBar()
      window.addEventListener('scroll', this.updateNavBar)
      window.addEventListener('scroll', this.closeMenu)
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.updateNavBar)
      window.removeEventListener('scroll', this.closeMenu)
    },
    methods: {
      updateNavBar() {
        const top = document.body.scrollTop || document.documentElement.scrollTop
        this.isFixed = top > 0
      },
      toggleOpenMenu() {
        this.openMenu = !this.openMenu
        this.$emit('toggleOpenMenu')
      },
      closeMenu() {
        this.openMenu = false
      }
    }
  }
</script>

<style lang="stylus">
  $nav_height = 50px
  navBackground($opacity=0.7)
    background-color rgba(0, 0, 0, $opacity)
    backdrop-filter saturate(180%) blur(20px)
  navOpenMenuTransition($t=0.25s)
    transition all $t $transition_fx2

  .global-nav-wrap
    position: relative
    z-index 999

    .nav-height-placeholder
      height $nav_height + 20px
      margin-bottom: 20px
      @media screen and (max-width $mobile_width)
        height $nav_height

    .global-nav
      position: absolute
      top: 0
      left: 0
      right: 0
      background-color rgba(255, 255, 255, 0.8)
      backdrop-filter: saturate(180%) blur(20px);
      border-bottom: 1px solid $color_border
      transition all .25s $transition_fx2
      &:hover
        background-color #fff

      &.fixed
        position: fixed
        &>.w-container
          height $nav_height
          .logo-wrap
            &>img
              width ($nav_height - 12px)
              height ($nav_height - 12px)
            &>p
              font-size 18px

      &>.w-container
        height ($nav_height + 20px)
        display flex
        align-items center
        justify-content space-between
        transition all .25s
        transition-timing-function $transition_fx2
        @media screen and (max-width $mobile_width)
          padding-right: 0
          height $nav_height
          position: relative
          &.open
            background #fff

        .logo-wrap
          display flex
          align-items center

          &:hover
            &>img
              transform scale(1.1)
          &:active
            &>img
              transform scale(0.9)
          &>img
            width $nav_height
            height $nav_height
            border-radius 50%
            transition all .25s
            transition-timing-function $transition_fx2
            @media screen and (max-width $mobile_width)
              width ($nav_height - 12px)
              height ($nav_height - 12px)

          &>p
            font-size 24px
            font-weight: bold
            margin-left: 10px
            transition font-size .25s
            @media screen and (max-width $mobile_width)
              font-size 18px

        .links-wrap
          align-self stretch
          display flex
          align-items center
          text-align: center
          &>a
            display inline-block
            min-width 50px
            &+a
              margin-left: 10px
          @media screen and (max-width: $mobile_width)
            position: absolute
            z-index 100
            padding 0 20px
            top $nav_height
            left 0
            right 0
            height 0
            overflow: hidden
            navOpenMenuTransition()
            border-bottom: 1px solid rgba(255, 255, 255, 0)
            text-align: left
            display block
            a
              display block
              padding 10px 0
              margin-left: 0 !important
            &.open
              background #fff
              height auto
              border-color rgba(255, 255, 255, 0.2)
              a
                opacity 1

        .mobile-menu
          display none
          @media screen and (max-width: $mobile_width)
            display flex
            align-items center
            .btn-openmenu
              width 40px
              height 23px
              margin-right: 10px
              background none
              border 0
              outline none
              color: $color_theme
              navOpenMenuTransition()
              position: relative
              padding 0
              &:before, &:after
                background $color_theme
                content: " ";
                display: block;
                position: absolute;
                top: 10px;
                width: 12px;
                height: 1px;
                z-index: 1;
                navOpenMenuTransition()
              &:before
                right 50%
                transform: rotate(40deg) scaleY(1.5)
              &:after
                left 39.5%
                transform: rotate(-40deg) scaleY(1.5)
              &.active
                &:before
                  transform: rotate(-40deg) scaleY(1.5)
                &:after
                  transform: rotate(40deg) scaleY(1.5)

        .mobile-menu-shade
          display none
          @media screen and (max-width: $mobile_width)
            display block
            position: absolute
            top 0
            left 0
            width 100%
            height 100vh
            z-index -1
            background transparent
            navOpenMenuTransition(0.7s)
            visibility hidden
          &.open
            visibility visible
            background rgba(0, 0, 0, 0.5)
  /**/
</style>
