<template>
  <div class="maincon-wrap">
    <div class="maincon-menu">
      <div class="title">载具</div>
      <div class="close" @click="closeMenu">
        <i class="icon iconfont icon-close"></i>
      </div>
    </div>
    <div class="techtree-wrap">
      <div v-for="(item, index) in techTrees" :key="index" class="techtree-column">
        <div v-for="obj in item" :key="obj.id" class="member-item">
          <ObjectCard :obj="obj"></ObjectCard>
          <div v-show="obj.next_id!=-1" class="arrow">
            <div class="arrow-elem"></div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import ObjectCard from './ObjectCard'

  export default {
    components: {
      ObjectCard
    },
    props: {
      techTrees: {
        type: Array,
        default: () => ([])
      }
    },
    data() {
      return {}
    },
    methods: {
      closeMenu() {
        this.$emit('close')
      }
    }
  }
</script>

<style lang="stylus">

  .maincon-wrap
    position absolute
    bottom 135px
    left 50%
    top 80px
    transform translateX(-50%)
    width 100%
    max-width 95%
    // height 80%
    color #fff
    // background rgba(35, 38, 43, 0.836)
    background url("~assets/images/warthunder/techtree_bg.png")
    border 1px solid #1c2632
    border-bottom none
    @media (max-width: 800px)
      top 0
      max-width 100%

    .maincon-menu
      height 40px
      line-height 40px
      display flex
      justify-content space-between
      background #2f3742
      border-bottom 1px solid #1c2632

      .title
        padding 0 10px
        font-weight bold
        position relative

        &:after
          content ""
          position absolute
          bottom 0
          left 2px
          right 2px
          background #b23820
          height 2px

        &:hover
          background #3d5a6b

      .close
        width 40px
        text-align center

        .icon
          font-size 26px

        &:hover
          background #B2391D

        &:active
          background #7E382B

    .techtree-wrap
      padding 10px
      box-sizing border-box
      overflow auto
      display flex
      position absolute
      top 41px
      left 0
      right 0
      bottom 0

      .techtree-column
        margin-right 50px

        .member-item
          width 162px
          margin-bottom 10px

          .arrow
            margin 10px auto 20px
            padding-left 45px
            box-sizing border-box

            .arrow-elem
              width 12px
              height 40px
              background #557574
              border 1px solid #000
              position relative

              &:before, &:after
                content ''
                border-style solid
                border-width 7px 6px 0px 6px
                border-color #557574 transparent transparent transparent
                position absolute
                bottom -6px
                width 0
                height 0
                left 0px

              &:before
                border-width 7px 6px 0px 6px
                border-color #000 transparent transparent transparent
                bottom -8px
                left 0px

</style>
