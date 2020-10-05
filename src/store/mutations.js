export default {
  setUserID (state, userID) {
    state.userID = userID
  },
  setToken (state, token) {
    state.token = token
  },
  toggleLoginBlock (state) {
    state.showLoginBlock = !state.showLoginBlock
  }
}
