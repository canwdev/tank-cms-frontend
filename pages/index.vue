<template>
  <div class="w-container">
    <div class="page-index">

      <div class="index-left">

        <div class="index-banner">
          <ActiveSwiper :banners="banners"/>
        </div>
        <div class="index-main">
          <PostsList :post-list="postList"/>
          <NLink to="/posts" class="__more">更多文章</NLink>
        </div>

      </div>
      <div class="index-right">
        <div class="index-sidebar">sidebar</div>
      </div>

    </div>
  </div>

</template>

<script>
  import {getBanners, getPostsList} from '~/assets/src/api/website'
  import ActiveSwiper from '~/components/ActiveSwiper'
  import PostsList from '~/components/PostsList'

  export default {
    components: {
      ActiveSwiper,
      PostsList
    },
    async asyncData({ route }) {
      let banners = {}
      let postList = []

      await getBanners().then(res => {
        banners = res.data
      }).catch(e => {
        console.error(e)
      })
      await getPostsList({
        limit: 5,
        offset: 0
      }).then(res => {
        postList = res.data
      }).catch(e => {
        console.error(e)
      })

      return {
        banners,
        postList
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
  }

  .index-main {
    margin-top: 10px
    min-height calc(100vh - 300px)
    .__more {
      display block
      text-align: right;
      margin-top: 10px
    }
  }

  .index-right {
    width: 19.5%
    height fit-content
  }

  .index-sidebar {
  }
</style>
