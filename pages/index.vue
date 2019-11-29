<template>
  <div class="w-container">
    <div class="page-index">

      <div class="index-left">

        <div class="index-banner">
          <ActiveSwiper :banners="banners"/>
        </div>
        <div class="index-main">main1</div>
        <div class="index-main">main2</div>

      </div>
      <div class="index-right">
        <div class="index-sidebar">sidebar</div>
      </div>

    </div>
  </div>

</template>

<script>
  import {getBanners} from '~/assets/src/api/website'
  import ActiveSwiper from '~/components/ActiveSwiper'

  export default {
    components: {
      ActiveSwiper
    },
    async asyncData({ route }) {
      let banners = {}

      await getBanners().then(res => {
        banners = res.data
      }).catch(e => {
        console.error(e)
      })

      return {
        banners
      }
    },
    watch: {},
    methods: {}
  }
</script>

<style lang="stylus" scoped>
  .page-index {
    display flex
    justify-content space-between
    flex-wrap wrap
  }

  .index-left, .index-right {
    background #fff
    padding 10px
    border 1px solid $color_border
    @media screen and (max-width: $mobile_width) {
      width: 100% !important
      margin-bottom: 10px
    }
  }

  .index-left {
    width: 80%
  }

  .index-banner {
    background #2f3742
  }

  .index-main {
    margin-top: 10px
    background #ccc
    height calc(100vh - 300px)
  }

  .index-right {
    width: 19.5%
    height 100vh
  }

  .index-sidebar {
    height 100%
    background #3d5a6b
  }
</style>
