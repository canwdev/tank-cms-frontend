const pkg = require('./package')
const environment = process.env.NODE_ENV || 'development'
const port = process.env.NUXT_PORT || '8081' // Nuxt 服务端口

const isProduction = environment === 'production'
// 注意：线上BASE_URL地址是实际可访问的地址，而不是被反向代理的原地址
const BASE_URL = isProduction ? `https://zencode.top:${port}` : `http://localhost:${port}`
// 后端服务器地址
const API_SERVER_URL = isProduction ? 'https://zencode.top:8099/api' : 'http://localhost:3001/api'

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
  loading: { color: '#1976d2' },

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
  plugins: [
    '~/plugins/index.js',
    { src: '~/store/localstorage.js', ssr: false }
  ],

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
      target: API_SERVER_URL,
      secure: false, // 防止HTTPS报错：UNABLE_TO_VERIFY_LEAF_SIGNATURE
      pathRewrite: {
        '^/api_blog': ''
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
