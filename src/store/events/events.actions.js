import firebaseInstance from 'src/middleware/firebase/database'

export default {
  getAllUserEvents: async ({}, companyName) => {
    return await firebaseInstance.getUserEvents(companyName)
  },
  getAllUsersEvents: async ({commit}) =>{
    const events =  await firebaseInstance.getAllUsersEvents()
  commit('setAllUsersEvents', events)
},

  addNewEvent: async ({},[title,companyName,event]) => {
    await firebaseInstance.addEvent({title,companyName,event})
  },

  editExistingEvent: async ({},[name, companyName, event]) => {
    await firebaseInstance.editEvent([name, companyName, event])
  },

  deleteExistingEvent: async ({},[event, companyName]) => {
    await firebaseInstance.deleteEvent(event,companyName)
  }
}
