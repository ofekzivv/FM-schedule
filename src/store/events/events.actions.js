import firebaseInstance, {getUserEvents} from '../../middleware/firebase/database'

export default {
  getAllUserEvents: async ({}, companyName) => {
    return await firebaseInstance.getUserEvents(companyName)
  },

  addNewEvent: async ({}, payload) => {
    await firebaseInstance.addEvent({payload})
  },

  editExistingEvent: async ({}, payload) => {
    await firebaseInstance.editEvent({payload})
  }
}
