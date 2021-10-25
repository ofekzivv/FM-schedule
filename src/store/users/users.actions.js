
import firebaseInstance from '../../middleware/firebase/database'

export default {
  // getUserInfo: async ({commit}, user) => {
  //   let arr = await getUser({})
  //   commit('setUserData', arr)
  // },
  getUser: async ({commit},companyName) =>{
    const user = await firebaseInstance.getUser(companyName);
    commit('setUser',user)
  },
  getUsers: async ({commit}) =>{
    const users = await firebaseInstance.getAllUsers()
    commit('setUsers', users)
  },

  editExistingUser: async ({}, [user,newCompanyName,newEmail]) => {
    if (user.companyName !== newCompanyName){
      let company = await this.getUser(user.companyName)
      let events = await firebaseInstance.getUserEvents(user.companyName)
      await this.deleteUser(user.companyName)
      await firebaseInstance.addUser({companyName: newCompanyName, email: newEmail, password: company.password})
      for (const event in events) {
        await firebaseInstance.addEvent({companyName:newCompanyName,event: event})
      }
    }
  },

  deleteUser: async ({commit}, companyName) => {
    await firebaseInstance.deleteUserFromDb(companyName).then(() => {
      console.log('The user was removed from actions')
    }).catch(err => console.log(err))
  }
}
