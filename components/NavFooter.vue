<template>
  <div class="global-footer">
    <div class="w1200">
      <p class="copyright">&copy; 2019 {{ BLOG_NAME }}, Automate deploy version</p>
    </div>
  </div>
</template>s

<script>
  export default {
    data: () => ({
      BLOG_NAME: 'Can\'s Blog'
    })
  }
</script>

<style lang="stylus" scoped>
  .global-footer
    margin-top: 30px
    padding 15px 0
    background rgba(0,0,0,.05)
    text-align: center
    color #878787
    .copyright
      font-size 12px

  /**/
</style>
