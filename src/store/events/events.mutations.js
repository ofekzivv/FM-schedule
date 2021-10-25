export default {
  setAllUsersEvents: ((state, events) => state.usersEvents = events),

  setCompanyName: ((state, company) => state.companyName = company),

  setUserEvents: ((state, userEvents) => state.userMonthlyEvents = userEvents),

  resetCompanyName: ((state) => state.companyName = ''),

  resetMonthlyEvents: ((state, events) => state.userMonthlyEvents = events),

  setSearchKeys: ((state, keys) => Object.assign(state.searchKeys, keys)),

  getEventsByKeys: ((state, userEvents) =>{
    console.log(userEvents)

    let events = userEvents

    if(state.searchKeys.title !== '')
      events = events.filter(event => event.title.includes(state.searchKeys.title))

    if(state.searchKeys.details !== '')
      events = events.filter(event => event.details.includes(state.searchKeys.details))

    if(state.searchKeys.date !== '')
      events = events.filter(event => event.date === state.searchKeys.date)

    let filteredEvents = events
   /* for(let type of state.searchKeys.eventType){
      let eventsByType = events
      eventsByType.filter(event => event.eventType === type)
      filteredEvents.concat(eventsByType)
    }*/
    console.log(filteredEvents)
    return filteredEvents
  })
}
