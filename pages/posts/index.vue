<template>
  <div class="w-container">
    <div class="page-blog">
      <div v-if="postAllCount > 0">
        <PostsList :post-list="postList"></PostsList>
        <ListPager :page-size="pageSize" :current-page.sync="currentPage" :total="postAllCount"></ListPager>
      </div>
      <div v-else class="no-content">
        暂时没有内容哟～
      </div>

    </div>
  </div>

</template>

<script>
  import PostsList from '~/components/PostsList'
  import ListPager from '~/components/ListPager'
  import { getPostsList } from '~/assets/src/api/website'
  import { backToTop } from '~/assets/src/utils'

  export default {
    components: {
      PostsList, ListPager
    },
    async asyncData({ route }) {
      let postList = []
      let postAllCount
      const pageSize = 10
      const currentPage = parseInt(route.query.page) || 1

      await getPostsList({
        limit: pageSize,
        offset: (currentPage - 1) * pageSize
      }).then(res => {
        postList = res.data
        postAllCount = res.count
      }).catch(e => {
        console.error(e)
      })

      return {
        currentPage,
        postList,
        postAllCount,
        pageSize
      }
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
    methods: {
      updatePostsList() {
        this.$nuxt.$loading.start()

        getPostsList({
          limit: this.pageSize,
          offset: (this.currentPage - 1) * this.pageSize
        }).then(res => {
          this.postList = res.data
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
  .page-blog
    .no-content
      text-align: center;

  /**/
</style>
