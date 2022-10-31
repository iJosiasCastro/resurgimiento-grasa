import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import utils from './utils'
import proyect from './proyect'
import message from './message'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    utils,
    proyect,
    message
  }
})

export default store

store.dispatch('auth/checkAuth')
