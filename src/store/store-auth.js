import firebaseInstance from '../middleware/firebase'
import {LocalStorage} from 'quasar'
import {checkAdmin} from "src/middleware/firebase/database";

const state = {
  loggedIn: false,
  admin: false,
  admins: [],
  adminData: {
    password:'',
    email: '',
    companyName: ''
  }
}

const mutations = {
  setLoggedIn(state, value) {
    state.loggedIn = value
  },
  setAdmin(state,value){
    state.admin = value
  },
  setAdminData: ((state, admin)=> {
    state.adminData.password = admin.password;
    state.adminData.email = admin.email;
    state.adminData.companyName = admin.companyName
  }),
  setAdmins: ((state, allAdmins) => state.admins = allAdmins)

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
    let isAdmin = await checkAdmin(payload.formData.email, payload.formData.password )
    console.log('isAdmin = ', isAdmin)
    if( isAdmin ){
      commit('setAdmin',true)
      LocalStorage.set('admin', true)
      LocalStorage.set('adminEmail', payload.formData.email )
    }
    else {
      commit('setAdmin',false)
      LocalStorage.set('admin', false)
    }
    await firebaseInstance.firebase.auth().signInWithEmailAndPassword(payload.formData.email, payload.formData.password)
      .then( async response => {
        window.user = response.user
        window.user.password = payload.formData.password
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
  },
  getAdmin: async ({commit}, companyName) => {
    let admin = await firebaseInstance.getAdmin(companyName);
    commit('setAdmin', admin)
    return admin
  },

  getAdmins: async ({commit}) =>{
    const admins = await firebaseInstance.getAllAdmins()
    commit('setAdmins', admins)
    return admins
  },

  editExistingAdmin: async ({commit}, [name,newName, email,password]) => {
    await firebaseInstance.deleteAdminFromDb(name)
    await firebaseInstance.addAdmin({companyName: newName, email, password})
  },
  deleteAdmin: async ({commit}, name) => {
    await firebaseInstance.deleteAdminFromDb(name).then(() =>{
      console.log('The admin was removed from actions')
    }).catch(err => console.log(err))
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
