import Vue from 'vue'
import Vuex from 'vuex'
import users from './users'

import auth from './store-auth'


Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    auth, users
  }
})
