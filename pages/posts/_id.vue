<template>
  <div class="post-detail-root">

    <div v-if="postData" class="post-detail-wrap">
      <h1 class="title">{{ postData.title }}</h1>
      <div class="description">
        <span>作者：{{ postData.author_ids || '/' }}</span>
        <span v-if="postData.update_time">更新时间：{{ formatTime(new Date(postData.updatedAt)) }}</span>
        <span v-else>发布时间：{{ formatTime(new Date(postData.createdAt)) }}</span>
      </div>
      <div class="content markdown-body" v-html="content"></div>
    </div>
    <div v-else class="post-detail-wrap">
      <h1 class="title">¯\_(ツ)_/¯</h1>
      <div class="description">内容加载失败！</div>
    </div>

  </div>
</template>

<script>
  import { formatTime } from '~/assets/src/utils'
  import { getDetail } from '~/assets/src/api/posts'
  const md = require('markdown-it')({
    html: true,
    breaks: true,
    linkify: true,
  })
  import hljs from 'highlight.js'
  import 'highlight.js/styles/a11y-dark.css'
  import '~/assets/styles/github-markdown.css'

  export default {
    layout: 'blog',
    computed: {
      content() {
        if (this.postData.isMarkdown) {
          return md.render(this.postData.content)
        }
        return this.postData.content
      }
    },
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
    mounted() {
      document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block)
      })
    },
    methods: {
      formatTime
    }
  }
</script>

<style lang="stylus" scoped>
  .post-detail-root
    padding 20px 0
    background #fff

  .post-detail-wrap
    max-width: 800px;
    margin: 0 auto;

    .title
      text-align: center;
      font-size: 23px;
      font-weight: bold;
      @media screen and (max-width $mobile_width)
        font-size 20px
        text-align: left

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
      pre
        background #1c2632
        color #00C48D
        padding 10px
        box-sizing border-box
        border-radius 5px
      .hljs
        padding 0
        overflow: auto

      p
        margin: 0;

      img, video
        max-width 100%
        height auto

</style>
