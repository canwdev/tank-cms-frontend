<template>
  <div class="global-footer">
    <div class="w1200">
      <div class="w-container footer-menu-wrap">
        <div class="__links-wrap">
          <div
            v-for="root in menuTree"
            :key="root.id"
            class="link-group"
            :class="{'__empty': !root.children}"
          >
            <div class="__title">{{ root.title }}</div>
            <ul>
              <li
                v-for="item in root.children"
                :key="item.id"
              ><NLink :to="item.url">{{item.title}}</NLink></li>
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
  import { SITE_TITLE } from '~/assets/src/utils/config'
  import { getWebsiteMenu } from '~/assets/src/api/website'

  export default {
    data() {
      return {
        menuTree: [],
        title: SITE_TITLE
      }
    },
    mounted() {
      // TODO: 转移到 vuex
      getWebsiteMenu().then(res => {
        this.menuTree = res.data
      }).catch(e => {
        console.error(e)
      })
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

    .__title {
      margin-top: 20px
      margin-bottom: 5px
    }

    .__links-wrap {
      display flex
      flex-wrap wrap
      width 80%

      .link-group {
        min-width 150px

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
    }
  }

</style>
