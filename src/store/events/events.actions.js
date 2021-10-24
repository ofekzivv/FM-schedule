import firebaseInstance, {getAllUsersEvents, getUserEvents} from '../../middleware/firebase/database'

export default {
  getAllUserEvents: async ({}, companyName) => {
    return await getUserEvents(companyName)
  },
getAllUsersEvents: async ({commit}) =>{
    const events =  await getAllUsersEvents()
  commit('setAllUsersEvents', events)
},

  addNewEvent: async ({}, payload) => {
    await firebaseInstance.addEvent({payload})
  },

  editExistingEvent: async ({}, payload) => {
    await firebaseInstance.editEvent({payload})
  },

  deleteExistingEvent: async ({}, payload) => {
    await firebaseInstance.deleteEvent({payload})
  }
}
