<template>
  <div class="page-index">

    <div v-if="postData.count > 0">
      <PostsList :post-data="postData"></PostsList>
      <ListPager :page-size="pageSize" :current-page.sync="currentPage" :total="postData.count"></ListPager>
    </div>
    <div v-else class="no-content">
      暂时没有内容哟～
    </div>

  </div>
</template>

<script>
  import PostsList from '~/components/PostsList'
  import ListPager from '~/components/ListPager'
  import { getList } from '~/assets/src/api/posts'
  import { backToTop } from '~/assets/src/utils'

  export default {
    layout: 'blog',
    components: {
      PostsList, ListPager
    },
    data: () => ({
      currentPage: 1
    }),
    computed: {

    },
    watch: {
      currentPage() {
        this.updatePostsList()
        backToTop(window.document)
      }
    },
    async asyncData() {
      let postData = {}
      const pageSize = 10

      await getList({
        limit: pageSize,
        offset: 0
      }).then(res => {
        postData = res.data
      }).catch(e => {
        console.error(e)
      })

      return {
        postData,
        pageSize,
      }
    },
    methods: {
      updatePostsList() {
        this.$nuxt.$loading.start()

        getList({
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
