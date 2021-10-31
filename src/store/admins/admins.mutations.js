export default {
  // setAdmin sets admin to state
  setAdmin: ((state, admin)=> {
    state.adminData.password = admin.password;
    state.adminData.email = admin.email;
    state.adminData.companyName = admin.companyName
  }),
  // setAdmins sets admins to state
  setAdmins: ((state, allAdmins) => state.admins = allAdmins)
}

