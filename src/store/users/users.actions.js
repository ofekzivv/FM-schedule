
import firebaseInstance from '../../middleware/firebase/database'

export default {
  // getUserInfo: async ({commit}, user) => {
  //   let arr = await getUser({})
  //   commit('setUserData', arr)
  // },
  getUser: async ({commit},companyName) =>{
    let user = await firebaseInstance.getUser(companyName);
    commit('setUser',user)
    return user
  },
  getUsers: async ({commit}) => {
    const users = await firebaseInstance.getAllUsers()
    commit('setUsers', users)
    return users
  },

  editExistingUser: async ({commit}, payload) => {
    let events = await firebaseInstance.getUserEvents(payload.user.companyName)
    if (payload.user.companyName !== payload.editedUser.companyNameInput){
      await firebaseInstance.addUser({
        companyName:payload.editedUser.companyNameInput,
        email: payload.editedUser.emailInput,
        password:payload.user.password,
        logo: payload.editedUser.logoInput,
        color: payload.editedUser.colorInput,
        events: events
      })
      await firebaseInstance.deleteUserFromDb(payload.user.companyName)
    }
    else {
      await firebaseInstance.editUser({
        companyName: payload.user.companyName,
        email: payload.editedUser.emailInput,
        password: payload.user.password,
        logo: payload.editedUser.logoInput,
        color: payload.editedUser.colorInput
      })
    }
  },

  deleteUser: async ({commit}, payload) => {
    await firebaseInstance.deleteUserFromDb(payload.companyName, payload.password).then(() => {
      console.log('The user was removed from actions')
    }).catch(err => console.log(err))
  }
}
