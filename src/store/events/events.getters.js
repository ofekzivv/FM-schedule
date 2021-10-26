export default  {
  getEventsByKeys: (state) => (userEvents) =>{
    console.log(userEvents)
    let events = userEvents
    if(state.searchKeys.title !== '')
      events.filter(event => event.title.contains(state.searchKeys.title))
    if(state.searchKeys.details !== '')
      events.filter(event => event.details.contains(state.searchKeys.details))
    if(state.searchKeys.date !== '')
      events.filter(event => event.date === state.searchKeys.date)

    let filteredEvents = []
    for(let type of state.searchKeys.eventType){
      let eventsByType = events
      eventsByType.filter(event => event.eventType === type)
      filteredEvents.concat(eventsByType)
    }
    console.log(filteredEvents)
    return filteredEvents
  },

  getUsersEvents: state => state.userEvents
}
