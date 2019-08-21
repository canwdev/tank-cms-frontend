<template>
  <div>
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
  *
    line-height: 1.4

  /**/
</style>
