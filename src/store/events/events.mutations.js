export default {
  setAllUsersEvents: ((state, events) => state.usersEvents = events),

  setCompanyName: ((state, company) => state.companyName = company),

  setUserEvents: ((state, userEvents) => state.userEvents = userEvents),

  resetCompanyName: ((state) => state.companyName = ''),

  resetMonthlyEvents: ((state, events) => state.userMonthlyEvents = events),

  setSearchKeys: ((state, keys) => Object.assign(state.searchKeys, keys)),

  setToggleFilter: ((state, options) => state.toggleFilter = options)
}
