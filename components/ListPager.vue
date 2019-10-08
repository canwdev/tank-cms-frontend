<template>
  <div class="pager">
    <button v-show="pagesCount > mSize" :disabled="mCurrentPage === 1" @click="updateCurrentPage(mCurrentPage - mSize)">«</button>
    <button :disabled="mCurrentPage === 1" @click="updateCurrentPage('prev')">‹</button>
    <div class="page-items"><button v-for="v in pageList" :key="v" :class="{active: v === mCurrentPage}" @click="updateCurrentPage(v)">{{ v }}</button></div>
    <button :disabled="mCurrentPage === pagesCount" @click="updateCurrentPage('next')">›</button>
    <button v-show="pagesCount > mSize" :disabled="mCurrentPage === pagesCount" @click="updateCurrentPage(mCurrentPage + mSize)">»</button>
  </div>
</template>

<script>
  const PAGE_GROUP_NUM = 5
  export default {
    props: {
      pageSize: {
        type: Number,
        default: 10
      },
      currentPage: {
        type: Number,
        default: 1
      },
      total: {
        type: Number,
        default: 1
      }
    },
    data: () => ({
      mCurrentPage: 1,
      mSize: 5
    }),
    computed: {
      pagesCount() {
        return Math.ceil(this.total / this.pageSize)
      },
      pageList() {
        const size = this.mSize
        const count = this.pagesCount
        const cur = this.mCurrentPage

        if (count <= size) {
          return count
        }

        // 将数列分割为短二维数组
        const groups = []
        for (let i = 0; i < Math.ceil(count / size); i++) {
          groups.push([])
        }
        let curGroup = 0
        for (let i = 1; i <= count; i++) {
          groups[curGroup].push(i)
          if (i % PAGE_GROUP_NUM === 0) {
            curGroup++
          }
        }
        // 确定当前选中在哪个组中
        for (let i = 0; i < groups.length; i++) {
          if (groups[i].indexOf(cur) !== -1) {
            curGroup = i
            break
          }
        }
        return groups[curGroup]
      }
    },
    watch: {
      mCurrentPage(nv) {
        this.$emit('update:currentPage', nv)
      }
    },
    mounted() {
      this.mCurrentPage = this.currentPage
    },
    methods: {
      updateCurrentPage(arg) {
        if (typeof arg === 'string') {
          if (arg === 'prev') {
            this.mCurrentPage = Math.max(1, this.mCurrentPage - 1)
          } else {
            this.mCurrentPage = Math.min(this.pagesCount, this.mCurrentPage + 1)
          }
          return
        }

        arg = Math.max(1, arg)
        arg = Math.min(this.pagesCount, arg)
        this.mCurrentPage = arg
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .pager
    text-align: center;
    margin 30px auto
    button
      line-height: 1.2
      font-size 14px
      min-width 35px
      background #fff
      border 1px solid $color_border
      cursor: pointer;
      outline none
      &[disabled]
        cursor: not-allowed
      &:hover
        background $color_theme_opacity
      &.active
        color #fff
        background $color_theme
    .page-items
      display inline-block
      button+button
        margin-left: -1px

  /**/
</style>
