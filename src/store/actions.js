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
    })
  }
}
