
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
  getUsers: async ({commit}) =>{
    const users = await firebaseInstance.getAllUsers()
    commit('setUsers', users)
    return users
  },

  editExistingUser: async ({commit}, [user,newCompanyName,newEmail]) => {
    if (user.companyName !== newCompanyName){
      let events = await firebaseInstance.getUserEvents(user.companyName)
      debugger
      await firebaseInstance.addUser({companyName: newCompanyName, email: newEmail, password: user.password, events: events})
      await firebaseInstance.deleteUserFromDb(user.companyName)
    }
    else {
      await firebaseInstance.setNewEmail({companyName: newCompanyName, email: newEmail})
    }
  },

  deleteUser: async ({commit}, companyName) => {
    await firebaseInstance.deleteUserFromDb(companyName).then(() => {
      console.log('The user was removed from actions')
    }).catch(err => console.log(err))
  }
}
