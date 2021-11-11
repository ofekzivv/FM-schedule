import firebaseInstance from 'src/middleware/firebase/database'

export default {
  // getAllUserEvents sends a request to DB to get all user events, commits the answer to state
  getAllUserEvents: async ({commit}, companyName) => {
    let res = await firebaseInstance.getUserEvents(companyName)
    commit('setUserEvents', res)
    return res
  },
  // getAllUserEvents sends a request to DB to get all users events, commits the answer to state
  getAllUsersEvents: async ({commit}, daily) =>{
    const events =  await firebaseInstance.getAllUsersEvents()
    commit('setAllUsersEvents', events)
    let sortedEvents = [events[0]]
    let dailyEvents = []
    if (events[0].date === new Date().toISOString().slice(0, 10).toString()) {
      dailyEvents.push(events[0])
    }
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
// addNewEvent sends a request to DB to add new event
  addNewEvent: async ({}, payload) => {
    await firebaseInstance.addEvent({companyName: payload.companyName, password: payload.password, event: payload.newEvent})
  },
// editExistingEvent sends a request to DB to edit an existing event
  editExistingEvent: async ({},payload) => {
    await firebaseInstance.editEvent({event: payload.newEvent, company: payload.company, newFiles: payload.newFiles, password: payload.password})
  },
// deleteExistingEvent sends a request to DB to delete existing event
  deleteExistingEvent: async ({},payload) => {
    await firebaseInstance.deleteEvent(payload.password, payload.event,payload.companyName)
  },
// getFilteredEvents filters events and returns result
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
// FilterByToggle filters events by toggle, commits answer to state
  FilterByToggle: ({state, commit},all) => {
    let filteredEvents
    if (all !== 'all') {
      filteredEvents = state.userEvents.filter(event => state.toggleFilter
        .includes(event.eventType))
      commit('setUserEvents', filteredEvents)
    }
    else{
      filteredEvents = state.usersEvents.filter(event => state.toggleFilter
        .includes(event.eventType))
      commit('setUserEvents', filteredEvents)
    }
  },
// getUserColor sends a request to DB to get user color
  getUserColor: async ({},companyName) => {
    return await firebaseInstance.getUserColorFb(companyName).then(res => {return res})
  },
// editFiles sends a request to DB to edit files in storage
  editFiles: async ({}, payload) => {
    return await firebaseInstance.editFilesInStorage(payload.newFiles, payload.password, payload.oldFiles)
  }
}
