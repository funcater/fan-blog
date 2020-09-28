import { createStore } from 'vuex'

export default createStore({
  state: {
    userID: undefined,
    token: undefined,
    showLoginBlock: false
  },
  mutations: {
    setUserID (state, userID) {
      state.userID = userID
    },
    setToken (state, token) {
      state.token = token
    },
    toggleLoginBlock (state) {
      state.showLoginBlock = !state.showLoginBlock
    }
  },
  actions: {
  },
  modules: {
  }
})
