import firebaseInstance, {getUserEvents} from '../../middleware/firebase/database'

export default {
  getAllUserEvents: async ({}, companyName) =>{
    return await firebaseInstance.getUserEvents(companyName)

}
}
