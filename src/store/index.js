import { createStore } from 'vuex'
import mutations from './mutations'
import actions from './actions'

export default createStore({
  state: {
    userID: undefined,
    token: undefined,
    showLoginBlock: false,
    articles: [],
    hasMoreArticles: true,
    isLoading: false,
    loadingAnimationText: '',
    loadingAnimation: undefined,
    recommendArticles: [],
    isRecommendLoading: false,
    article: {
      title: undefined,
      content: undefined,
      date: undefined,
      _id: undefined
    }
  },
  mutations: mutations,
  actions: actions
})
