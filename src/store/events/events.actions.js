import firebaseInstance from 'src/middleware/firebase/database'

export default {
  getAllUserEvents: async ({}, companyName) => {
    return await firebaseInstance.getUserEvents(companyName)
  },
  getAllUsersEvents: async ({commit}) =>{
    const events =  await firebaseInstance.getAllUsersEvents()
    commit('setAllUsersEvents', events)
    let sortedEvents = [events[0]]
  debugger
    for (let i = 1; i < events.length; i++) {
      for (let j = 0; j < sortedEvents.length; j++) {
        debugger
        if (new Date(sortedEvents[j].date) - new Date(events[i].date) >= 0){
          sortedEvents.splice(j,0, events[i])
          j= 0
          break
        }
        if (j === sortedEvents.length-1){
          sortedEvents.push(events[i])
          break
        }
      }
    }
    return sortedEvents
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
