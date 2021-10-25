export default {
  setUserData: ((state, user) => state.userData = user),

  setEvents: ((state, events) => state.events = events),

  resetUserData: ((state) => {
    state.userData = {
      password: '',
      email: '',
      companyName: ''
    }
  }),

  setUsers: ((state, allUsers) => state.users = allUsers),

  setUser: ((state, user) => {
      state.userData.password = user.password;
      state.userData.email = user.email;
      state.userData.companyName = user.companyName
    }
  ),

  setEmail: ((state, email) => state.userData.user = email),


}
