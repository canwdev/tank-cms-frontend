export default ({ isHMR, store }) => {
  // In case of HMR, mutation occurs before nuxReady, so previously saved state
  // gets replaced with original state received from server. So, we've to skip HMR.
  // Also nuxtReady event fires for HMR as well, which results multiple registration
  if (isHMR) return

  if (process.client) {
    window.onNuxtReady((nuxt) => {
      store.commit('loadSettings', window.localStorage)
    })
  }
}
