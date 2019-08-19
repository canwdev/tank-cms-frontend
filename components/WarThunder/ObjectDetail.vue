<template>
  <div
    v-show="!hidden"
    ref="detail_elem"
    class="detail-wrap"
    :style="'top:'+y+'px;left:'+x+'px'"
    @mouseover="showDetail"
    @mouseleave="hideDetail"
  >
    <div v-show="!hidden_loading" class="main-content">
      <p>{{ obj.name }}</p>
      <p :class="map_vehicle_type[obj.vehicle_type]"><i class="icon iconfont icon-light"></i> {{
        map_vehicle_type_name[obj.vehicle_type] }}</p>
      <p><span class="grey">分房权重：</span>{{ obj.battle_lv == 0 ? '初始': obj.battle_lv }}</p>
      <p style="margin-top: 20px" class="red">必须研发前置载具：{{ obj.next_id }}</p>
      <ObjectCard class="obj-card" :obj="obj"></ObjectCard>
    </div>
    <round-loading v-show="hidden_loading" class="loading"></round-loading>
  </div>
</template>

<script>
  import RoundLoading from '~/components/Animation/RoundLoading'
  import ObjectCard from './ObjectCard'

  export default {
    components: {
      ObjectCard,
      RoundLoading
    },
    data() {
      return {
        mx: 0,
        my: 0,
        id: -1,
        hidden: true,
        hidden_loading: true, // 切换显示隐藏加载中和内容
        obj: {},
        map_vehicle_type_name: {
          '1': '轻型坦克',
          '2': '中型坦克',
          '3': '重型坦克',
          '4': '坦克歼击车',
          '5': '防空炮'
        },
        map_vehicle_type: {
          '1': 'light',
          '2': 'medium',
          '3': 'heavy',
          '4': 'destoryer',
          '5': 'aag'
        },
        detil_hover: false,
        screen_width: window.innerWidth,
        screen_height: window.innerHeight,
        card_height: 0,
        card_width: 0
      }
    },
    computed: {
      x() {
        // 使其始终显示在屏幕内部而不超出
        let x = this.mx
        const offset_left = this.screen_width - (x + this.card_width)
        if (offset_left < 0) {
          x += offset_left
        }
        return x
      },
      y() {
        let y = this.my
        const offset_top = this.screen_height - (y + this.card_height)
        if (offset_top < 0) {
          y += offset_top - 100
        }
        return y
      }
    },
    mounted() {
      const _this = this

      // 所有组件都能接收到的事件
      this.$bus.$on('objHover', function(res, obj) {
        _this.updateHW()
        // 解决第一次HW都为零的问题
        setTimeout(_this.updateHW, 100)

        const x = res.x + 40
        const y = res.y

        _this.mx = x
        _this.my = y
        _this.hidden = false

        // 加载
        if (res.id != _this.id) {
          _this.hidden_loading = true

          // 模拟加载
          setTimeout(() => {
            _this.id = res.id
            _this.obj = obj
            _this.hidden_loading = false
          }, 100)
        }
      })

      this.$bus.$on('objHoverOut', function() {
        // setTimeout(() => {
        if (!_this.detil_hover) {
          _this.hidden = true
        }
        // }, 100);
      })
    },
    methods: {
      hideDetail() {
        this.detil_hover = false
        this.hidden = true
      },
      showDetail() {
        this.detil_hover = true
        this.hidden = false
      },
      updateHW() {
        const t_elem = this.$refs.detail_elem
        const height = t_elem ? this.$refs.detail_elem.offsetHeight : 0
        const width = t_elem ? this.$refs.detail_elem.offsetWidth : 0

        this.card_height = height
        this.card_width = width
      }
    }
  }
</script>

<style lang="stylus">
  .detail-wrap
    position fixed
    top 10px
    left 10px
    background #161b21
    color #fcffff
    padding 10px
    box-sizing border-box
    z-index 100
    border 1px solid #2b343d
    width 365px
    font-size 14px

    .main-content
      p
        margin 0
        text-align center

        &.light
          color #fff

        &.medium
          color #f5a9b3

        &.heavy
          color #e95166

        &.destroyer
          color #b5e6af

        &.aag
          color green

      .grey
        color #b4b8b9

      .red
        color #bb1811

      .obj-card
        pointer-events none
        width 162px
        margin 10px auto
</style>
