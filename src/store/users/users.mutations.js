export default {
  setUserData: ((state,user) => state.userData = user),

  setEvents: ((state, events) => state.events = events),

  resetUserData: ((state) => {
    state.userData = {
      fullName: '',
      email: '',
      companyName: ''
    }
  }),

  setUsers: ((state,allUsers) => state.users = allUsers)

}
