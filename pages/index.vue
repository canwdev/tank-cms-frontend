<template>
  <div class="page-index">
    <PostsList :post-data="postData"></PostsList>
  </div>
</template>

<script>
  import PostsList from '~/components/PostsList'
  import { getList } from '~/assets/src/api/posts'

  export default {
    components: {
      PostsList
    },
    async asyncData() {
      let postData = {}

      await getList({
        limit: 12,
        offset: 0
      }).then(res => {
        postData = res.data
      }).catch(e => {
        console.error(e)
      })

      return {
        postData
      }
    }
  }
</script>

<style lang="stylus" scoped>

/**/
</style>
