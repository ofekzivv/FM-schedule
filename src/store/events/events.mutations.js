export default {
  setCompanyName: ((state, company) => state.companyName = company),

  setMonthlyEvents: ((state, events) => state.userMonthlyEvents = events),

  resetCompanyName: ((state) => state.companyName = ''),

  resetMonthlyEvents: ((state, events)=> state.userMonthlyEvents = events)
}
