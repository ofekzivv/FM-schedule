import firebaseInstance from '../middleware/firebase'
import {LocalStorage} from 'quasar'
import {checkAdmin} from "src/middleware/firebase/database";

const state = {
  loggedIn: false,
  admin: false
}

const mutations = {
  setLoggedIn(state, value) {
    state.loggedIn = value
  },
  setAdmin(state,value){
    state.admin = value
  }
}

const actions = {

  registerUser({},payload) {
    return firebaseInstance.firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        window.user = response.user;
        return response.user.uid
      }).catch(error => {
        console.log('error', error)
      })
  },

  async loginUser({commit},payload) {
    debugger
    if( await checkAdmin(payload.formData.email, payload.formData.password )){
      commit('setAdmin',true)
      LocalStorage.set('admin', true)
    }
    await firebaseInstance.firebase.auth().signInWithEmailAndPassword(payload.formData.email, payload.formData.password)
      .then( async response => {
        debugger
        window.user = response.user;
        window.user.uid = payload.formData.password
        console.log("response", response)
        console.log(response.user.uid)
        debugger

      }).catch(error => {
        console.log('error', error)
      })
  },

  logoutUser({commit}) {
    return firebaseInstance.firebase.auth().signOut().then(() => {
      commit('setAdmin',false)
      commit('setLoggedIn',false)
      console.log('User Signed out')
    }).catch(err => {
      console.log(err)
    })
  },

  handleAuthStateChange({commit}) {
    firebaseInstance.firebase.auth().onAuthStateChanged(user => {
      if (user) {
        commit('setLoggedIn', true)
        LocalStorage.set('loggedIn', true)
        window.user = user
        this.$router.push('/')
          .catch(() => {
        })
      } else {
        commit('setLoggedIn', false)
        LocalStorage.set('loggedIn', false)
        window.user = null
        this.$router.replace('/auth')
      }
    })
  }
}

const getters = {
  getAdmin() {
    return this.state.admin
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
