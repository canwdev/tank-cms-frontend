<template>
  <div class="global-nav-wrap">
    <div class="global-nav" :class="{fixed: isFixed}">
      <div class="w-container">
        <NLink to="/" class="logo-wrap">
          <img src="~/assets/images/icons/avatar.jpg">
          <p>MyBlog</p>
        </NLink>

        <div class="links-wrap">
          <NLink to="/">首页</NLink>
          <a href="###">分类</a>
          <a href="###">关于</a>
        </div>
      </div>
    </div>
    <div class="nav-height-placeholder"></div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      isFixed: false
    }),
    mounted() {
      this.updateNavBar()
      window.addEventListener('scroll', this.updateNavBar)
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.updateNavBar)
    },
    methods: {
      updateNavBar() {
        const top = document.body.scrollTop || document.documentElement.scrollTop
        this.isFixed = top > 0
      }
    }
  }
</script>

<style lang="stylus">
  $nav_height = 50px

  .global-nav-wrap
    position: relative

    .nav-height-placeholder
      height $nav_height + 20px
      margin-bottom: 20px

    .global-nav
      position: absolute
      top: 0
      left: 0
      right: 0
      background-color rgba(255, 255, 255, 0.8)
      backdrop-filter: saturate(180%) blur(20px);
      border-bottom: 1px solid $color_border
      transition all .25s $transition_fx1
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
        transition-timing-function $transition_fx1
        @media screen and (max-width $mobile_width)
          padding-right: 0

        .logo-wrap
          display flex
          align-items center
          @media screen and (max-width $mobile_width)
            width 30%

          &:hover
            &>img
              transform scale(1.1)
          &>img
            width $nav_height
            height $nav_height
            border-radius 50%
            transition all .25s
            transition-timing-function $transition_fx1
          &>p
            font-size 24px
            font-weight: bold
            margin-left: 10px
            transition font-size .25s

        .links-wrap
          align-self stretch
          display flex
          align-items center
          text-align: right
          @media screen and (max-width $mobile_width)
            border-left: 1px solid $color_border
            width 60%
            overflow: auto
            text-align: center

          &>a
            display inline-block
            min-width 50px
            &+a
              margin-left: 10px

  /**/
</style>
