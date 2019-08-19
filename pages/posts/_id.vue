<template>
  <div>

    <div v-if="postData" class="post-detail-wrap">
      <h1 class="title">{{ postData.title }}</h1>
      <div class="description">
        <span>作者：{{ postData.author_ids || '/' }}</span>
        <span v-if="postData.update_time">更新时间：{{ formatTime(new Date(postData.updatedAt)) }}</span>
        <span v-else>发布时间：{{ formatTime(new Date(postData.createdAt)) }}</span>
      </div>
      <div class="content" v-html="postData.content"></div>
    </div>
    <div v-else class="post-detail-wrap">
      <h1 class="title">¯\_(ツ)_/¯</h1>
    </div>

  </div>
</template>

<script>
  import { formatTime } from '~/assets/src/utils'
  import { getDetail } from '~/assets/src/api/posts'

  export default {
    layout: 'blog',
    async asyncData({ params }) {
      let postData
      const id = params.id

      await getDetail({ id }).then(res => {
        postData = res.data
      }).catch(e => {
        console.error(e)
      })

      return {
        postData
      }
    },
    methods: {
      formatTime
    }
  }
</script>

<style lang="stylus" scoped>
  .post-detail-wrap
    max-width: 800px;
    margin: 0 auto;

    .title
      text-align: center;
      font-size: 23px;
      font-weight: bold;

    .description
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 45px;
      color: #aaa;
      font-size 14px

    >>> .content
      margin: 20px auto;
      font-size: 16px;
      line-height: 1.5;
      color: #212121;
      white-space: pre-line;
      overflow-x auto

      p
        margin: 0;

      img
        max-width 100%
        height auto

</style>
