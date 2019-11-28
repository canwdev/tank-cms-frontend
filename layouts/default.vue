<template>
  <div class="blog-layout">
    <NavBar></NavBar>

    <nuxt />

    <NavFooter></NavFooter>
  </div>
</template>

<script>
  import NavBar from '~/components/NavBar'
  import NavFooter from '~/components/NavFooter'

  export default {
    components: {
      NavBar, NavFooter
    }
  }
</script>

<style lang="stylus" scoped>
  .blog-layout
    min-height 100vh
    background url("~assets/images/blog/bg.png") no-repeat center/cover
    background-attachment fixed
    .w-container
      min-height calc(100vh - 292px)

    *
      line-height: 1.4

  /**/
</style>
