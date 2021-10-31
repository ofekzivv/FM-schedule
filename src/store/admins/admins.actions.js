import firebaseInstance from '../../middleware/firebase/database'

export default {
  // getAdmin sends a request to DB to get admin and commits answer to state
  getAdmin: async ({commit}, companyName) => {
    let admin = await firebaseInstance.getAdmin(companyName);
    commit('setAdmin', admin)
    return admin
  },
  //getAdmins sends a request to DB to get all of the admins and commits answer to state
  getAdmins: async ({commit}) => {
    const admins = await firebaseInstance.getAllAdmins()
    commit('setAdmins', admins)
    return admins
  },
  //editExistingAdmin sends a request to DB to edit an existing admin by deleting the admin and adding it with new values
  editExistingAdmin: async ({commit}, [name, newName, email, password]) => {
    await firebaseInstance.deleteAdminFromDb(name)
    await firebaseInstance.addAdmin({companyName: newName, email, password})
  },
  //deleteAdmin sends a request to DB to delete an admin from DB
  deleteAdmin: async ({commit}, name) => {
    await firebaseInstance.deleteAdminFromDb(name).then(() => {
      console.log('The admin was removed from actions')
    }).catch(err => console.log(err))
  }
}
