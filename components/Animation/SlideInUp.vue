<template>
  <transition>
    <slot></slot>
  </transition>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
  .v-enter, .v-leave-to
    opacity 0
    top 1000px
  .v-enter-active, .v-leave-active
    transition all .4s
</style>
