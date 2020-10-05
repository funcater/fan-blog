import { createStore } from 'vuex'
import mutations from './mutations'

export default createStore({
  state: {
    userID: undefined,
    token: undefined,
    showLoginBlock: false
  },
  mutations: mutations,
  actions: {
  },
  modules: {
  }
})
