<template>
  <div class="blog-layout">
    <NavBar></NavBar>

    <div class="w-container">
      <nuxt />
    </div>

    <Live2D></Live2D>

    <NavFooter></NavFooter>
  </div>
</template>

<script>
  import NavBar from '~/components/NavBar'
  import NavFooter from '~/components/NavFooter'
  import Live2D from '~/components/Live2D'

  export default {
    components: {
      NavBar, NavFooter, Live2D
    }
  }
</script>

<style lang="stylus" scoped>
  .blog-layout
    min-height 100vh
    background url("~assets/images/blog/bg.png") no-repeat center/cover
    background-attachment fixed
    .w-container
      min-height calc(100vh - 166px)
      @media screen and (max-width $mobile_width)
        min-height calc(100vh - 146px)
    *
      line-height: 1.4

  /**/
</style>
