import firebaseInstance from 'src/middleware/firebase/database'

export default {
  getAllUserEvents: async ({commit}, companyName) => {
    await firebaseInstance.getUserEvents(companyName).then(res => {
      commit('setUserEvents', res)
    })
  },
  getAllUsersEvents: async ({commit}, daily) =>{
    const events =  await firebaseInstance.getAllUsersEvents()
    commit('setAllUsersEvents', events)
    let sortedEvents = [events[0]]
    let dailyEvents = []
    for (let i = 1; i < events.length; i++) {
      if (events[i].date === new Date().toISOString().slice(0, 10).toString()){
        dailyEvents.push(events[i])
      }
      for (let j = 0; j < sortedEvents.length; j++) {
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
    if (daily !== 'daily') {
      return sortedEvents
    }
   return dailyEvents
},

  addNewEvent: async ({},[title,companyName,event]) => {
    await firebaseInstance.addEvent({title,companyName,event})
  },

  editExistingEvent: async ({},[name, companyName, event]) => {
    await firebaseInstance.editEvent([name, companyName, event])
  },

  deleteExistingEvent: async ({},[event, companyName]) => {
    await firebaseInstance.deleteEvent(event,companyName)
  },
  getFilteredEvents: async ({state, commit}, userEvents) => {
    let events = userEvents

    if(state.searchKeys.title !== '')
      events = events.filter(event => event.title.includes(state.searchKeys.title))

    if(state.searchKeys.details !== '')
      events = events.filter(event => event.details.includes(state.searchKeys.details))

    if(state.searchKeys.date !== '')
      events = events.filter(event => event.date === state.searchKeys.date)

    let filteredEvents = events
    if(state.searchKeys.eventType.length >0)
      filteredEvents = filteredEvents.filter(event=> state.searchKeys.eventType.includes(event.eventType))

    return filteredEvents
  },

  FilterByToggle: ({state, commit}) => {
    let filteredEvents = []
    filteredEvents = state.userEvents.filter(event=> state.toggleFilter
      .includes(event.eventType))
    console.log(filteredEvents)
    commit('setUserEvents', filteredEvents)
  }
}
