export default {
  state: {
    userName: 'Ghosie',
    userAvatar: '/icon/avatar.png',
    backgroundImgUrl: '/default/img0.jpg',
    theme: 'default'
  },
  mutations: {
    CHANGE_USERNAME(state, userName) {
      state.userName = userName
    },
    CHANGE_USERAVATAR(state, url) {
      state.userAvatar = url
    },
    CHANGE_BACKGROUND_IMG_URL(state, url) {
      state.backgroundImgUrl = url
    },
    CHANGE_THEME(state, name) {
      state.theme = name
    }
  },
  actions: {
    changeUserName({ commit }, userName) {
      commit('CHANGE_USERNAME', userName)
    },
    changeUserAvatar({ commit }, url) {
      commit('CHANGE_USERAVATAR', url)
    },
    changeBackgroundImgUrl({ commit }, url) {
      commit('CHANGE_BACKGROUND_IMG_URL', url)
    },
    changeTheme({ commit }, name) {
      commit('CHANGE_THEME', name)
    }
  },
}