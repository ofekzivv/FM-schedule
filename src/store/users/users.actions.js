import {getUser, getAllUsers} from 'src/middleware/firebase/database'
import firebaseInstance from '../../middleware/firebase/database'

export default {
  // getUserInfo: async ({commit}, user) => {
  //   let arr = await getUser({})
  //   commit('setUserData', arr)
  // },
  getUsers: async ({commit}) =>{
    const users = await getAllUsers();
    commit('setUsers', users)
  },

  editExistingUser: async ({}, payload) => {
    await firebaseInstance.editUser(payload).then(() => {
      console.log('The user was removed from actions')
    }).catch(err => console.log(err))
  },

  deleteUser: async ({commit}, userId) => {
    await firebaseInstance.deleteUserFromDb(userId).then(() => {
      console.log('The user was removed from actions')
    }).catch(err => console.log(err))
  }
}
