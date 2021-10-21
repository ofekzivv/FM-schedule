import {getUser, getAllUsers} from 'src/middleware/firebase/database'

export default {
  // getUserInfo: async ({commit}, user) => {
  //   let arr = await getUser({})
  //   commit('setUserData', arr)
  // },
  getUsers: async ({commit}) =>{
    const users = await getAllUsers();
    commit('setUsers', users)
  }
}
