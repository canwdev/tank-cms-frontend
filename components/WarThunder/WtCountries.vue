<template>
  <div class="countries-wrap">
    <div v-for="(item, index) in countriesList" :key="index" class="country-item" :class="item.active?'active':''">
      <div class="country-info" :title="item.country_name" @click="changeCountry(index)">
        <img class="icon-img" :src="item.country_icon">
        <span class="name">{{ item.country_name }}</span>
      </div>
      <queeze-box>
        <div v-show="item.active" class="member-wrap">
          <div v-for="item in item.member_list" :key="item.id" class="member-item">
            <ObjectCard :obj="item.vehicle"></ObjectCard>
            <div class="member-level">
              <i class="icon iconfont icon-star"></i>{{ item.level }}
            </div>
          </div>
        </div>
      </queeze-box>
    </div>
  </div>
</template>

<script>
  import QueezeBox from '~/components/Animation/QueezeBox'
  import Vue from 'vue'
  import ObjectCard from './ObjectCard'

  export default {
    components: {
      QueezeBox,
      ObjectCard
    },
    props: {
      countries: {
        type: Array,
        default: () => ([])
      }
    },
    data() {
      return {
        selected_country_index: 1
      }
    },
    computed: {
      countriesList() {
        const t = this.countries
        const index = this.selected_country_index

        for (const i in t) {
          if (i == index) {
            Vue.set(t[i], 'active', true)
          } else {
            Vue.set(t[i], 'active', false)
          }
        }
        return t
      }
    },
    methods: {
      changeCountry(index) {
        this.selected_country_index = index
      }
    }
  }
</script>

<style lang="stylus">
  .countries-wrap
    width 100%
    height 100%
    flex 1
    border-top: 2px solid rgba(5, 3, 4, 0.52)
    display flex
    overflow hidden

    .country-item
      display flex
      transition all 0.5s
      width 38px

      .country-info
        position relative
        display flex
        align-items center
        overflow hidden
        background #161d23
        min-width 38px
        writing-mode tb
        font-weight bold
        padding 5px 2px
        border-left 2px solid #23282e

        .name
          padding-right 0px
          opacity 0

        &::after
          content: ""
          position absolute
          top 0
          left 0
          right 0
          bottom 0
          background rgba(0, 0, 0, 0.6)

        .icon-img
          content ""
          height 18px
          width 24px
          display block
          margin-bottom 5px
          background-size 100%

        &.USA::before
          background url("~assets/images/warthunder/country_usa.png") no-repeat center

        &.GER::before
          background url("~assets/images/warthunder/country_ger.png") no-repeat center

        &.USSR::before
          background url("~assets/images/warthunder/country_ussr.png") no-repeat center

        &.ENG::before
          background url("~assets/images/warthunder/country_eng.png") no-repeat center

        &:hover
          &::after
            opacity 0
          background #1b3f47

        &:active
          background #193a42

      .member-wrap
        width 100%
        display flex
        // display none
        align-items center
        overflow auto

        .member-item
          width 162px
          margin-left 5px
          flex-shrink 0

          .obj-card
            border-bottom-left-radius 0
            border-bottom-right-radius 0

          &:hover
            .member-level
              background linear-gradient(to bottom, #222f33 0%, #3e4f5a 100%)

          .member-level
            font-size 12px
            padding 2px
            box-sizing border-box
            height 23px
            background linear-gradient(to bottom, #161e21 0%, #303d45 100%)
            border-bottom-left-radius 2px
            border-bottom-right-radius 2px
            border 1px solid #000
            border-top none
            box-shadow 0 5px 10px rgba(0, 0, 0, 0.247) inset

            .icon
              font-size 10px
              margin 0 2px
              color #9eb7be
              text-shadow 0 0 2px rgba(255, 255, 255, 0.6)

      &.active
        flex 1

        .country-info
          &::after
            opacity 0

  /**/
</style>
