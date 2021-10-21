import {getUser} from '../../middleware/firebase/database/index'

export default {
  getUserInfo: async ({commit}, userId) => {
    let arr = await this.getUser(userId)
    commit('setUserData', arr)
  }
}
