import firebaseInstance from '../middleware/firebase'
import {getUser} from '../middleware/firebase/index'
import {LocalStorage} from 'quasar'

const state = {
  loggedIn: false
}

const mutations = {
  setLoggedIn(state, value) {
    state.loggedIn = value
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

  loginUser({},payload) {
    return firebaseInstance.firebase.auth().signInWithEmailAndPassword(payload.formData.email, payload.formData.password)
      .then(response => {
        window.user = response.user;
        window.user.uid = payload.formData.password
        console.log("response", response)
        console.log(response.user.uid)
        return response.user.uid
      }).catch(error => {
        console.log('error', error)
      })
  },

  logoutUser() {
    return firebaseInstance.firebase.auth().signOut().then(() => {
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

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
