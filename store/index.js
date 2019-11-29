import { getWebsiteMeta } from '~/assets/src/api/website'

const LS_SETTINGS = 'website-settings'

export const state = () => ({
  websiteInfo: {
    websiteTitle: 'websiteTitle'
  },
  settings: {
    hideLive2D: true
  },
  websiteMenu: []
})

export const mutations = {
  loadSettings(state, localStorage) {
    // 加载localStorage里面的设置
    if (localStorage.getItem(LS_SETTINGS)) {
      state.settings = Object.assign(state.settings, JSON.parse(localStorage.getItem(LS_SETTINGS)))
    }
  },
  saveSettings(state, { setting, localStorage }) {
    state.settings = Object.assign(state.settings, setting)
    localStorage.setItem(LS_SETTINGS, JSON.stringify(state.settings))
  },
  websiteInfo(state, newData) {
    state.websiteInfo = newData
  },
  setWebsiteMenu(state, newData) {
    state.websiteMenu = newData
  }
}

export const actions = {
  // Nuxt全局服务初始化调用
  nuxtServerInit(store, { app, req, params, route }) {

    // 初始化时的全局任务
    const initFetchAppData = [
      store.dispatch('fetchWebsiteMenu', { app })
    ]

    return Promise.all(initFetchAppData)
  },

  // Action 可以包含任意异步操作
  // 获取页脚数据
  fetchWebsiteMenu({ commit }, { app }) {

    return getWebsiteMeta().then(res =>{
      app.store.commit('setWebsiteMenu', res.data.menu)
      app.store.commit('websiteInfo', res.data.websiteInfo)
    }).catch(e => {
      console.error('Error getWebsiteMenu', e)
      app.store.commit('setWebsiteMenu', [])
    })
  }
}
