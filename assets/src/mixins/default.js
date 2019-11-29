import { mapState } from 'vuex'

export default {
  head() {
    return {
      title: this.websiteInfo.websiteTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.websiteInfo.description
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.websiteInfo.keywords
        }
      ]
    }
  },

  computed: {
    ...mapState(['websiteInfo'])
  }
}
