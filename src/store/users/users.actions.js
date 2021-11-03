
import firebaseInstance from '../../middleware/firebase/database'
import firebase from '../../middleware/firebase'

export default {
  //getUser sends a request to DB to get a user, commits answer to state and return answer
  getUser: async ({commit},companyName) =>{
    let user = await firebaseInstance.getUser(companyName);
    commit('setUser',user)
    return user
  },
  //getUser sends a request to DB to get users , commits answer to state and return answer
  getUsers: async ({commit}) => {
    const users = await firebaseInstance.getAllUsers()
    commit('setUsers', users)
    return users
  },
//editExistingUser sends a request to DB to get the user events, adds a new user with new data and deletes the old data from DB
//  if the user has events, if not edits the user data
  editExistingUser: async ({commit}, payload) => {
    let events = await firebaseInstance.getUserEvents(payload.user.companyName)
    if (payload.user.companyName !== payload.editedUser.companyNameInput){
      await firebaseInstance.addUser({
        companyName:payload.editedUser.companyNameInput,
        email: payload.editedUser.emailInput,
        password:payload.user.password,
        logo: payload.editedUser.logoInput,
        color: payload.editedUser.colorInput,
        uid: payload.user.uid,
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
        color: payload.editedUser.colorInput,
        uid: payload.editedUser.uid
      })
    }
  },
// deleteUser sends a request to DB to delete a user from DB
  deleteUser: async ({commit}, payload) => {
    await firebaseInstance.deleteUserFromDb(payload.companyName, payload.password).then(() => {
    }).catch(err => console.log(err))
  }
}
