<template>
  <div class="container">
    <div class="dount"></div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="stylus" scoped>
.loading
  display flex
  justify-content center
  margin 30px auto
.dount 
  display: inline-block
  border: 4px solid #607D8B
  height: 30px
  width: 30px
  border-radius: 50%
  border-left-color: #fff
  animation: dount-sping 1.2s infinite linear
@keyframes dount-sping 
  0% {
    transform: rotate(0deg)
  }

  100% {
    transform: rotate(360deg)
  }

</style>
