const pkg = require('./package')
const environment = process.env.NODE_ENV || 'development'
const port = process.env.NUXT_PORT || '8081'
const BASE_URL = environment === 'production' ? 'http://sagit.top:' + port : 'http://localhost:' + port

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#4caf50' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/styles/normalize.css',
    '~/assets/styles/base.styl'
  ],
  styleResources: {
    // stylus
    stylus: ['~/assets/styles/variables.styl']
  },

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    proxy: true
  },
  proxy: {
    '/api_blog': {
      target: 'http://sagit.top:9002/api',
      pathRewrite: {
        '^/api_blog': '/'
      }
    }
  },

  env: {
    baseUrl: BASE_URL
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  }
}
