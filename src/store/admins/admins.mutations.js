export default {
  setAdmin: ((state, admin)=> {
    state.adminData.password = admin.password;
    state.adminData.email = admin.email;
    state.adminData.companyName = admin.companyName
  }),
  setAdmins: ((state, allAdmins) => state.admins = allAdmins)
}

