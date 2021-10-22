import state from './events.state'
import getters from './events.getters'
import mutations from './events.mutations'
import  actions from './events.actions'

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state
}
