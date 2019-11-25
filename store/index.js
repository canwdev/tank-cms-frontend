const LS_SETTINGS = 'website-settings'

export const state = () => ({
  settings: {
    hideLive2D: true
  }
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
  }
}

export const actions = {
  // Nuxt全局服务初始化调用
  nuxtServerInit(store, { app, req, params, route }) {

  }
}
