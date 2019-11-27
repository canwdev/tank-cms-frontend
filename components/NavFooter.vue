<template>
  <div class="global-footer">
    <div class="w1200">
      <p class="copyright">&copy; {{ new Date().getFullYear() }} {{ title }}, Powered by Nuxt.js</p>
    </div>
  </div>
</template>s

<script>
  import {SITE_TITLE} from '~/assets/js/config'

  export default {
    data() {
      return {
        title: SITE_TITLE
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .global-footer
    margin-top: 30px
    padding 15px 0
    background rgba(0, 0, 0, .05)
    text-align: center
    color #878787

    .copyright
      font-size 12px

  /**/
</style>
