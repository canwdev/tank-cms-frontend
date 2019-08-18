<template>
  <div class="post-list-wrap">
    <div class="w-container">

      <NLink :to="'posts/'+v.id" v-for="(v, i) in postData.rows" :key="i" class="list-item">
        <h3>{{ v.title }}</h3>
        <span class="update-time">{{ v.updatedAt }}</span>
        <p>{{ v.content }}</p>
      </NLink>

    </div>
  </div>
</template>

<script>
  export default {
    props: {
      postData: {
        type: Object,
        default: () => ({
          count: 0,
          rows: []
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .post-list-wrap
    .list-item
      display block
      background white
      padding 20px
      border 1px solid $color_border
      text-decoration: none
      $boxShadow()

      &+.list-item
        margin-top: 10px

      h3
        color: #000
        font-weight: 600

      .update-time
        color: #939393
        display block
        margin 5px 0

      p
        color #939393

  /**/
</style>
