import { createStore } from 'vuex'

export default createStore({
  state: {
    userName: 'Ghosie'
  },
  getters: {
  },
  mutations: {
    CHANGE_USERNAME(state, userName) {
      state.userName = userName
    }
  },
  actions: {
    changeUserName({ commit }, userName) {
      commit('CHANGE_USERNAME', userName)
    }
  },
  modules: {
  }
})
