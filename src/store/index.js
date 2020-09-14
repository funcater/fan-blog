import { createStore } from 'vuex'

export default createStore({
  state: {
    userID: '',
    token: ''
  },
  mutations: {
    setUserID (state, userID) {
      state.userID = userID
    },
    setToken (state, token) {
      state.token = token
    }
  },
  actions: {
  },
  modules: {
  }
})
