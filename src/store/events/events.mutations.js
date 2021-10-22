export default {
  setCompanyName: ((state, company) => state.companyName = company),

  setUserEvents: ((state, userEvents) => state.userMonthlyEvents = userEvents),

  resetCompanyName: ((state) => state.companyName = ''),

  resetMonthlyEvents: ((state, events)=> state.userMonthlyEvents = events)
}
