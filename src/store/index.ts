import { createStore } from 'vuex'

export default createStore({
  state: {
    userName: 'Ghosie',
    userAvatar: '/icon/avatar.png',
    backgroundImgUrl: '/default/img0.jpg',
    zIndex: 2
  },
  getters: {
  },
  mutations: {
    CHANGE_USERNAME(state, userName) {
      state.userName = userName
    },
    CHANGE_USERAVATAR(state, url) {
      state.userAvatar = url
    },
    CHANGE_BACKGROUND_IMG_URL(state,url) {
      state.backgroundImgUrl = url
    },
    CHANGE_ZINDEX(state) {
      state.zIndex++
    }
  },
  actions: {
    changeUserName({ commit }, userName) {
      commit('CHANGE_USERNAME', userName)
    },
    changeUserAvatar({commit}, url) {
      commit('CHANGE_USERAVATAR', url)
    },
    changeBackgroundImgUrl({commit},url) {
      commit('CHANGE_BACKGROUND_IMG_URL', url)
    },
    changeZIndex({commit}){
      commit('CHANGE_ZINDEX')
    }
  },
  modules: {
  }
})
