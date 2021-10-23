export default  {
  getEventsByKeys: state =>{
    let events = state.userEvents
    if(state.searchKeys.title !== '')
      events.filter(event => event.title.contains(state.searchKeys.title))
    if(state.searchKeys.details !== '')
      events.filter(event => event.details.contains(state.searchKeys.details))
    if(state.searchKeys.date !== '')
      events.filter(event => event.date === state.searchKeys.date)
    for(let key in state.searchKeys.type){
      if(key)
        events.filter(event => event.type.key === key)
    }
    return events
  },
}
