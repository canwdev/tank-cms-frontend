<template>
  <client-only>
    <div class="live2d-wrap" :class="{hidden}">
      <div class="action-group">
        <button @click="hideLive2D">{{ hidden ? '显示Live2D' : '隐藏Live2D' }}</button>
      </div>
      <transition name="bounce">
        <div v-show="showHitokoto" class="message">{{ hitokoto }}</div>
      </transition>
      <canvas id="live2d" width="280" height="500" class="live2d" @click.prevent="fetchHitokoto"></canvas>
    </div>
  </client-only>
</template>

<script>
  import { mapState } from 'vuex'
  import axios from 'axios'
  import load from '~/assets/src/utils/dynamicLoadScript'
  import { saveHitokoto } from '../assets/src/api/tools'

  export default {
    data: () => ({
      live2dStarted: false,
      hitokoto: '',
      showHitokoto: false,
      loadingHitokoto: false // 防止重复请求，加载时隐藏message框
    }),
    computed: {
      ...mapState({
        hidden: state => state.settings.hideLive2D
      })
    },
    watch: {
      hidden(nv) {
        if (!nv && !this.live2dStarted) {
          this.startLive2D()
        }
      }
    },
    mounted() {
      // 定时获取一言
      this.fetchInterval = null
      this.fetchTimeout = null

      setTimeout(() => {
        // 是否自动加载L2D
        if (!this.hidden) {
          this.startLive2D()
        }
      }, 200)
    },
    methods: {
      startLive2D() {
        load('/static/live2d/js/live2d.js', err => {
          if (err) {
            console.error(err.message)
            return
          }
          // 启动live2d！
          // eslint-disable-next-line no-undef
          loadlive2d('live2d', '/static/live2d/models/suzukaze_aoba/index.json')
          this.live2dStarted = true
          console.log('Live2d Started')
        })
        this.fetchHitokoto()
      },
      fetchHitokoto() {
        clearInterval(this.fetchInterval)
        clearTimeout(this.fetchTimeout)
        this.showHitokoto = false
        if (this.loadingHitokoto) return
        this.loadingHitokoto = true

        // const types = ['a', 'b', 'c']
        // const type = types[Math.floor(Math.random() * types.length)]
        // axios.get(`https://v1.hitokoto.cn/?c=${type}`).then(res => {
        axios.get(`https://v1.hitokoto.cn`).then(res => {
          setTimeout(() => {
            this.hitokoto = res.data.hitokoto
            this.showHitokoto = true
          }, 100) // 防止动画一闪而过

          // 保存数据到服务器
          saveHitokoto({
            key: res.data.id,
            value: JSON.stringify(res.data)
          })

          // n秒后自动隐藏
          this.fetchTimeout = setTimeout(() => {
            this.showHitokoto = false
          }, 15000)
        }).catch(e => {
          console.error(e)
          this.showHitokoto = false
        }).finally(() => {
          this.loadingHitokoto = false
        })

        // 定时刷新一言
        this.fetchInterval = setInterval(() => {
          this.fetchHitokoto()
        }, 30000)
      },
      hideLive2D() {
        const hidden = !this.hidden
        this.$store.commit('saveSettings',
          { setting: { 'hideLive2D': hidden }, 'localStorage': window.localStorage }
        )
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .bounce-enter-active, .bounce-leave-active {
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.57, 2.8);
  }
  .bounce-enter, .bounce-leave-to {
    opacity: 0;
    transform scale(0.5)
  }

  $border_color = rgba(103, 58, 183, 0.4)
  $bg_color = rgba(255, 255, 255, 0.6)
  $box_shadow_color = rgba(103, 58, 183, 0.3)

  $transition(time=0.3s)
    transition all time cubic-bezier(0.68, -0.55, 0.27, 1.55)
    @media screen and (max-width $tablet_width)
      transition all time ease  // 节约移动端性能

  .live2d-wrap
    position: fixed
    bottom 0
    right 0
    width 280px
    height: 430px
    $transition(.5s)
    @media screen and (max-width $mobile_width)
      transform-origin right bottom
      transform scale(0.8)

    &.hidden
      height 40px
      pointer-events none
      .action-group
        visibility visible
        opacity 1
      canvas#live2d, .message
        visibility hidden
        opacity 0
    &:hover
      .action-group
        visibility visible
        opacity: 1;

    .action-group
      position: absolute;
      top: 0
      right 10px
      z-index 2
      visibility hidden
      opacity 0
      pointer-events visible
      $transition()
      &>button
        $transition()
        background $bg_color
        border 1px solid $border_color
        border-radius 10px
        padding 5px 10px
        outline none
        cursor: pointer;
        &:hover
          box-shadow 0 0 10px $box_shadow_color

    canvas#live2d
      cursor: pointer
      $transition()

    .message
      position: absolute
      bottom: 15%
      left 10%
      right 10%
      padding 5px
      text-align: center
      border: 1px solid $border_color;
      border-radius: 12px;
      background-color: $bg_color;
      box-shadow: 0 3px 10px 2px $box_shadow_color;
      font-size: 13px;
      pointer-events none
      z-index 2

    @media screen and (max-width: $mobile_width)
      opacity 0.99
      transform-origin right bottom

  /**/
</style>
