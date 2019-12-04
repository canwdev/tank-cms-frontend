<template>
  <div class="faq-wrap" :class="{'light-theme': lightTheme}">
    <div :id="item.title[0]" v-for="(item, index) in list" :key="item.title + index" ref="faqItem" class="faq-item">
      <div class="title" :class="{active: isOpen(index)}" @click="toggleLinksShow(item,index,$event)">
        <div v-if="item.title instanceof Array" class="faq--array-wrap">
          <span v-for="(v,i) in item.title" :key="i" class="span--array">{{ v }}</span>
        </div>

        <span v-if="typeof item.title === 'string'">{{ item.title }}</span>
        <span class="iconfont icon-close2">+</span>
      </div>
      <div class="content" v-html="item.content"/>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      list: {
        type: Array,
        default: () => ([{
          title: 'Why?', // ['str1', 'str2', 'str3']
          content: 'Answer'
        }])
      },
      lightTheme: {
        type: Boolean,
        default: false
      }
    },
    data: () => ({
      listControl: []
    }),
    watch: {
      faqList() {
        this.$nextTick(() => {
          this.refreshFLC()
        })
      }
    },
    mounted() {
      this.refreshFLC()
    },
    methods: {
      refreshFLC() {
        this.listControl = []
        if (this.list.length > 0) {
          this.list.forEach(() => {
            this.listControl.push({open: false})
          })

          this.$refs.faqItem.forEach((v,) => {
            const titleHeight = v.querySelector('.title').clientHeight
            v.style.height = titleHeight + 'px'
          })
        }
      },
      isOpen(index) {
        if (!this.listControl[index]) {
          return false
        }
        return this.listControl[index].open
      },
      toggleLinksShow(item, index, evt) {
        this.$emit('onFaqListTitleClick', item)
        const open = this.listControl[index].open
        this.listControl[index].open = !open

        // 切换展开关闭
        const expandHeight = evt.target.clientHeight + evt.target.nextElementSibling.clientHeight

        if (!open) {
          evt.target.parentNode.style.height = expandHeight + 'px'
        } else {
          evt.target.parentNode.style.height = evt.target.clientHeight + 'px'
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  $titleHeight = 70px
  $titleHeightMobile = 55px
  .faq-wrap
    &.light-theme
      .faq-item
        border-color #d8d8d8

        &:last-child
          border-bottom: none

        & > .title
          color: #000

          & > .iconfont
            color: $color_theme_red

        & > .content
          color: #666

    .faq-item
      transition all .3s
      width 100%
      border-bottom 1px solid #333
      height: 0
      min-height $titleHeight
      overflow: hidden
      @media screen and (max-width: $mobile_width)
        min-height $titleHeightMobile

      & > .title
        position: relative
        color: #fff
        font-size 16px
        min-height $titleHeight
        line-height: 1.3
        display flex
        align-items center
        justify-content space-between
        cursor pointer
        transition all .3s

        &:after { // just for fix IE bug
          content: '';
          min-height: inherit;
          font-size: 0;
        }

        @media screen and (max-width: $mobile_width)
          font-size 14px

        &:hover
          color: $color_theme_red
        @media screen and (max-width: $mobile_width)
          min-height $titleHeightMobile

        & > span
          pointer-events none
          padding 10px 10px
          max-width 90%

        .faq--array-wrap
          display flex
          pointer-events none
          width 100%

        .span--array
          padding 0 20px
          @media screen and (max-width: $mobile_width)
            font-size 12px
            padding 0 5px

        .span--array:nth-child(1), .span--array:nth-child(2)
          flex 2

        .span--array:nth-child(3)
          flex 1
          @media screen and (max-width: $mobile_width)
            flex 2

        & > .iconfont
          position: absolute
          top 0
          right 0px
          line-height $titleHeight
          content: ''
          display block
          transform rotate(0)
          transition transform .3s
          font-size 16px
          padding-top: 0
          padding-bottom: 0
          @media screen and (max-width: $mobile_width)
            line-height $titleHeightMobile
            right: -5px

        &.active > .iconfont
          transform rotate(45deg)

      & > .content
        padding 20px 20px
        line-height: 1.5
        @media screen and (max-width $mobile_width)
          font-size 14px

  /**/
</style>
