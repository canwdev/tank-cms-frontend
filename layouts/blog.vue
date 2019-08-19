<template>
  <div>
    <NavBar></NavBar>

    <div class="w-container">
      <nuxt />
    </div>

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
  *
    line-height: 1.4

  /**/
</style>
