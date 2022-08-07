import { createStore } from 'vuex'
import App from './modules/app'
import User from './modules/user'
import getters from './modules/getter'

const store =  createStore({
  modules: {
    App,
    User
  },
  getters
})

export default store