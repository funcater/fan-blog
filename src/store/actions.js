import http from '@/config/http.js'

export default {
  getArticles ({ commit }, payload) {
    commit('toggleIsLoading', true)

    http({
      method: 'GET',
      url: './article/all',
      params: payload
    }).then(res => {
      if (res.data.length === 0) {
        commit('toggleHasMoreArticles', false)
      } else {
        commit('toggleHasMoreArticles', true)
      }
      commit('setArticles', res.data)
      commit('toggleIsLoading', false)
    }).catch(err => {
      console.log(err)
      commit('toggleIsLoading', false)
    })
  },
  getRecommendArticles ({ commit }, payload) {
    commit('toggleIsRecommendLoading', true)

    http({
      method: 'GET',
      url: './article/random',
      params: payload
    }).then(res => {
      commit('setRecommendArticles', res.data)
      commit('toggleIsRecommendLoading', false)
    }).catch(err => {
      console.log(err)
      commit('toggleIsRecommendLoading', false)
    })
  },
  getArticleByID ({ commit }, payload) {
    http({
      method: 'GET',
      url: './article',
      params: payload
    }).then(res => {
      commit('setArticle', res.data)
    }).catch(err => {
      console.log(err)
    })
  }
}
