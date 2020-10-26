export default {
  setUserID (state, userID) {
    state.userID = userID
  },
  setToken (state, token) {
    state.token = token
  },
  toggleLoginBlock (state) {
    state.showLoginBlock = !state.showLoginBlock
  },
  setArticles (state, articles) {
    state.articles = [...state.articles, ...articles]
  },
  toggleHasMoreArticles (state, hasMoreArticles) {
    state.hasMoreArticles = hasMoreArticles === undefined ? !state.hasMoreArticles : hasMoreArticles
  },
  toggleIsLoading (state, isLoading) {
    state.isLoading = isLoading === undefined ? !state.isLoading : isLoading
    if (state.isLoading) {
      state.loadingAnimation = setInterval(() => {
        if (state.loadingAnimationText.length === 3) {
          state.loadingAnimationText = ''
        } else {
          state.loadingAnimationText = state.loadingAnimationText + '.'
        }
      }, 300)
    } else {
      state.loadingAnimationText = ''
      clearInterval(state.loadingAnimation)
    }
  },
  setRecommendArticles (state, recommendArticles) {
    state.recommendArticles = recommendArticles
  },
  toggleIsRecommendLoading (state, isRecommendLoading) {
    state.isRecommendLoading = isRecommendLoading
  },
  setArticle (state, article) {
    state.article = article
  }
}
