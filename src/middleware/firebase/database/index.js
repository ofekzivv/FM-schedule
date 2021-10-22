import fireBaseInstance from '../';

export async function getAllUsers() {
  return await fireBaseInstance.firebase.database().ref('users').once('value')
    .then(res => {
      const arr = [];
      const map = res.val();
      for (const key in map) {
        const item = map[key];
        item.id = key;
        arr.push(item);
      }
      return arr;
    })
}

function getUser(options) {
  return fireBaseInstance.firebase.database().ref(`users/${options.companyName}`).once('value')
    .then(res => {
      const arr = [];
      const map = res.val();
      for (const key in map) {
        const item = map[key];
        item.id = key;
        arr.push(item);
      }
      return arr;
})
}

 function deleteUserFromDb(companyName) {
 return fireBaseInstance.firebase.database().ref(`users/${companyName}`).remove().then(() => {
   console.log('the user was removed from db')
 }).catch(err => err)
}

async function addEvent(options){
  return await fireBaseInstance.firebase.database().ref(`users/${options.payload.companyName}/events/${options.payload.event.date}`).set(options.payload.event)
}

export async function getUserEvents(options) {
  return await fireBaseInstance.firebase.database().ref(`users/${options}/events`).once('value')
    .then(res => {
      const arr = [];
      const map = res.val();
      for (const key in map) {
        const item = map[key];
        item.id = key;
        arr.push(item);
      }
      return arr;
    })
}

export async function addUser(options) {
  return await fireBaseInstance.firebase.database().ref(`users/${options.companyName}`).set({email: options.email, companyName: options.companyName})
}


export default {
  getUser, getUserEvents, deleteUserFromDb, addEvent
}
