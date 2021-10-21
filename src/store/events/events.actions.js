import {getMonthlyEvents} from 'src/middleware/firebase/database'

export default {
  getMonthlyEvents: async ({state,commit}, [companyName]) =>{
    const monthlyEvents = await getUserMonthlyData(companyName)
    commit('setMonthlyEvents', companyName)
}
}
