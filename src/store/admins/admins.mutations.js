export default {
  setAdmin: ((state, admin)=> {
    state.adminData = admin
  }),
  setAdmins: ((state, allAdmins) => state.admins = allAdmins)
}

