<template>
  <no-ssr>
    <div class="live2d-wrap" @click="fetchHitokoto">
      <div class="message">{{ hitokoto }}</div>
      <canvas id="live2d" width="280" height="500" class="live2d"></canvas>
    </div>
  </no-ssr>
</template>

<script>
  import axios from 'axios'
  import load from '~/assets/src/utils/dynamicLoadScript'

  export default {
    data: () => ({
      hitokoto: 'Loading >_<'
    }),
    mounted() {
      load('/static/live2d/js/live2d.js', err => {
        if (err) {
          console.error(err.message)
          return
        }
        // 启动live2d！
        // eslint-disable-next-line no-undef
        loadlive2d('live2d', '/static/live2d/models/suzukaze_aoba/index.json')
      })
      this.fetchHitokoto()
    },
    methods: {
      fetchHitokoto() {
        axios.get('https://v1.hitokoto.cn/?c=b').then(res => {
          this.hitokoto = res.data.hitokoto
        }).catch(e => {
          console.error(e)
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .live2d-wrap
    position: fixed
    bottom 0
    right 0
    width 280px
    height: 430px
    #live2d
      cursor: pointer
    .message
      position: absolute
      bottom: 15%
      left 10%
      right 10%
      padding 10px
      text-align: center
      border: 1px solid rgba(103, 58, 183, 0.4);
      border-radius: 12px;
      background-color: rgba(255, 255, 255, 0.8);
      box-shadow: 0 3px 15px 2px rgba(103, 58, 183, 0.3);
      font-size: 13px;
      pointer-events none

    @media screen and (max-width: $mobile_width)
      opacity 0.99
      transform-origin right bottom
      transform scale(0.8)

  /**/
</style>
