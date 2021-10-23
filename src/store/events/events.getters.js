export default  {
  getEventsByKeys: ((state, searchKeys) =>{
    let events = state.userEvents
    if(searchKeys.title !== '')
      events.filter(event => event.title.contains(searchKeys.title))
    if(searchKeys.details !== '')
      events.filter(event => event.details.contains(searchKeys.details))
    if(searchKeys.date !== '')
      events.filter(event => event.date === searchKeys.date)
    for(let key in searchKeys.type){
      if(key)
        events.filter(event => event.type.key === key)
    }
    return events
  })
}
