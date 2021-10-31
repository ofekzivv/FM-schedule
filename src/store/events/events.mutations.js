export default {
  // setAllUsersEvents sets all of the users events in state
  setAllUsersEvents: ((state, events) => state.usersEvents = events),
// setCompanyName sets company name in state
  setCompanyName: ((state, company) => state.companyName = company),
// setUserEvents sets a users events in state
  setUserEvents: ((state, userEvents) => state.userEvents = userEvents),
// setSearchKeys sets search keys in state
  setSearchKeys: ((state, keys) => Object.assign(state.searchKeys, keys)),
// setToggleFilter sets toggle filter in state
  setToggleFilter: ((state, options) => state.toggleFilter = options)
}
