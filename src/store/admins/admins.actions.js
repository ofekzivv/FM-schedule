
import firebaseInstance from '../../middleware/firebase/database'

export default {
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
