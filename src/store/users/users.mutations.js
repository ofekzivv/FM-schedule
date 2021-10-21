export default {

  setUserId: ((state, id) => state.userId = id),

  setUserData: ((state,user) => state.userData = user),

  setEvents: ((state, events) => state.events = events),

  resetUserId: ((state) => state.userId = ''),

  resetUserData: ((state) => {
    state.userData = {
      fullName: '',
      email: '',
      companyName: ''
    }
  }),

}
