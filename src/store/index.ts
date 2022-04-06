import { createStore } from 'vuex'

export default createStore({
  state: {
    userName: 'Ghosie',
    backgroundImgUrl: '/default/img0.jpg'
  },
  getters: {
  },
  mutations: {
    CHANGE_USERNAME(state, userName) {
      state.userName = userName
    },
    CHANGE_BACKGROUND_IMG_URL(state,url) {
      state.backgroundImgUrl = url
    }
  },
  actions: {
    changeUserName({ commit }, userName) {
      commit('CHANGE_USERNAME', userName)
    },
    changeBackgroundImgUrl({commit},url) {
      commit('CHANGE_BACKGROUND_IMG_URL', url)
    }
  },
  modules: {
  }
})
