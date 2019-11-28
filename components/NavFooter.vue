<template>
  <div class="global-footer">
    <div class="w1200">
      <div class="w-container footer-menu-wrap">
        <div class="__links-wrap">
          <div
            v-for="root in websiteMenu"
            :key="root.id"
            class="link-group"
            :class="{'__empty': !root.children}"
          >
            <div class="__title">{{ root.title }}</div>
            <ul>
              <li
                v-for="item in root.children"
                :key="item.id"
              >
                <NLink :to="item.url">{{item.title}}</NLink>
              </li>
            </ul>
          </div>
        </div>

        <div class="__social-wrap">
          <div class="__title">Social Media</div>
        </div>
      </div>
      <p class="footer-copyright">&copy; {{ new Date().getFullYear() }} {{ title }}, Powered by Nuxt.js</p>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import { SITE_TITLE } from '~/assets/src/utils/config'

  export default {
    data() {
      return {
        menuTree: [],
        title: SITE_TITLE
      }
    },
    computed: {
      ...mapState(['websiteMenu'])
    }
  }
</script>

<style lang="stylus" scoped>
  .global-footer {
    margin-top: 30px
    background #fff
    color #878787
  }

  .footer-copyright {
    text-align: center
    padding 10px 0
    background rgba(0, 0, 0, .05)
    font-size 12px
  }

  .footer-menu-wrap {
    padding 0 0 20px 0
    display flex
    justify-content space-between
    flex-wrap wrap
    @media screen and (max-width: $tablet_width) {
      padding-left: 10px
      padding-right: 10px
    }

    .__title {
      margin-top: 20px
      margin-bottom: 5px
    }

    .__links-wrap {
      display flex
      flex-wrap wrap
      width 80%
      @media screen and (max-width: $mobile_width) {
        width: 100%
        padding 0 0 20px
      }

      .link-group {
        min-width 150px
        @media screen and (max-width: $mobile_width) {
          min-width 33.33%
        }

        &.__empty {
          display none
        }

        ul, li {
          list-style none
          margin 0
          padding 0
        }

        li a {
          font-size: 12px
          line-height: 1.5
        }
      }
    }

    .__social-wrap {
      width: 20%
      @media screen and (max-width: $mobile_width) {
        width: 100%
      }
    }
  }

</style>
