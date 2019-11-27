<template>
  <div class="w-container">
    <div class="page-index">

      <div v-if="postData.count > 0">
        <PostsList :post-data="postData"></PostsList>
        <ListPager :page-size="pageSize" :current-page.sync="currentPage" :total="postData.count"></ListPager>
      </div>
      <div v-else class="no-content">
        暂时没有内容哟～
      </div>

    </div>

    <Live2D></Live2D>
  </div>

</template>

<script>
  import PostsList from '~/components/PostsList'
  import ListPager from '~/components/ListPager'
  import { getPostsList } from '~/assets/src/api/website'
  import { backToTop } from '~/assets/src/utils'
  import Live2D from '~/components/Live2D'

  export default {
    layout: 'blog',
    components: {
      PostsList, ListPager, Live2D
    },
    watch: {
      currentPage(nv) {
        this.updatePostsList()

        // 更新router query
        this.$router.replace({
          path: this.$route.path, query: {
            ...this.$route.query,
            page: nv
          }
        })

        backToTop(window.document)
      }
    },
    async asyncData({ route }) {
      let postData = {}
      const pageSize = 10
      const currentPage = parseInt(route.query.page) || 1

      await getPostsList({
        limit: pageSize,
        offset: (currentPage - 1) * pageSize
      }).then(res => {
        postData = res.data
      }).catch(e => {
        console.error(e)
      })

      return {
        currentPage,
        postData,
        pageSize,
      }
    },
    methods: {
      updatePostsList() {
        this.$nuxt.$loading.start()

        getPostsList({
          limit: this.pageSize,
          offset: (this.currentPage - 1) * this.pageSize
        }).then(res => {
          this.postData = res.data
        }).catch(e => {
          console.error(e)
        }).finally(() => {
          this.$nuxt.$loading.finish()
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .page-index
    .no-content
      text-align: center;

  /**/
</style>
