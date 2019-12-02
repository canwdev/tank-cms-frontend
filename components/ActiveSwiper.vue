<template xmlns:v-swiper="http://www.w3.org/1999/xhtml">
  <div class="active-swiper" :class="{light: lightTheme}">

    <div v-if="banners && banners.length > 0" v-swiper:mySwiper="swiperOption" class="swiper-container">
      <div class="swiper-wrapper">
        <div v-for="(item,i) in banners" :key="i" class="swiper-slide">
          <a :href="item.url">
            <div class="sl--img">
              <img :src="item.img">

            </div>
            <div class="sl--desc">
              <h3>{{ item.title }}</h3>
              <p v-if="item.desc">{{ item.desc }}</p>
            </div>
          </a>
        </div>
      </div>
      <!-- Navigation -->
      <div class="swiper-button-next" :class="{'swiper-button-black': lightTheme, 'swiper-button-white': !lightTheme}" />
      <div class="swiper-button-prev" :class="{'swiper-button-black': lightTheme, 'swiper-button-white': !lightTheme}" />

    </div>

    <div v-else>
      Banner 无数据。
    </div>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.min.css'

  export default {
    props: {
      banners: {
        type: Array,
        default: () => ([
          {
            img: '',
            title: 'Title',
            desc: 'desc',
            id: 1
          }
        ])
      },

      lightTheme: {
        type: Boolean,
        default: false
      }
    },
    data: () => ({
      swiperOption: {
        speed: 1000,
        // init: false,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        observeParents: true,
        observer: true
      }
    })
  }
</script>

<style lang="stylus" scoped>
  .active-swiper
    position relative

  .swiper-container
    width: 100%

  .swiper-slide
    width 100%
    text-align: center
    @media screen and (max-width: $tablet_width)
      width 85%

    .sl--img
      width 100%
      height 0
      padding-bottom 50%
      position: relative

      & > img
        position: absolute
        top 0
        left 0
        height: 100%
        width 100%
        object-fit cover
        opacity 1

    .sl--desc
      background-color rgba(0, 0, 0, 0.5)
      position: absolute;
      bottom 0
      left 0
      right 0
      text-align: left;
      display: inline-block;
      opacity: 0;
      transition-duration: 1.2s;
      word-break break-word
      padding 10px 55px

      & > h3
        line-height: 1.16667;
        font-weight: 600;
        letter-spacing: .009em;
        color: #fff;
        font-size: 20px;

      & > p
        margin-top: 10px;
        color: #ccc;
        font-size: 15px;

      &:hover
        & > h3
          color: $color_theme_red

  .swiper-button-prev
    left 0
    background url("~assets/images/icons/swiper-arrow-left.svg")

  .swiper-button-next
    right 0
    background url("~assets/images/icons/swiper-arrow-right.svg")

  .swiper-button-white, .swiper-button-black
    top 22px
    height 100%
    background-position center
    background-repeat no-repeat
    background-size 20px
    width 50px
    &:hover
      background-color rgba(0, 0, 0, 0.3)

  .swiper-slide-active
    .sl--desc
      opacity: 1;

  /**/

</style>
