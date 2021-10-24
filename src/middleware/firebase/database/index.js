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

function addEvent(options) {
  let eventKey = fireBaseInstance.firebase.database().ref(`users/${options.payload.companyName}/events/${options.payload.event.date}`).push(options.payload.event).key
  return fireBaseInstance.firebase.database().ref(`users/${options.payload.companyName}/events/${options.payload.event.date}/${eventKey}`).update({'eventKey': eventKey})
}

function editEvent(options) {
  return fireBaseInstance.firebase.database().ref(`users/${options.payload.companyName}/events/${options.payload.event.date}/${options.payload.event.eventKey}`).set(options.payload.event)
}

function deleteEvent(options) {
  return fireBaseInstance.firebase.database().ref(`users/${options.payload.companyName}/events/${options.payload.event.date}/${options.payload.event.eventKey}`).remove().then(() => {
    console.log('removed from firebase')
  }).catch(err => {
    console.log(err)
  })

}


export async function getUserEvents(options) {
  return await fireBaseInstance.firebase.database().ref(`users/${options}/events`).once('value')
    .then(res => {
      const arr = [];
      const map = res.val();
      for (const key in map) {
        const item = map[key];
        for (const val in item) {
          arr.push(item[val])
        }
      }
      return arr;
    })
}

export async function addUser(options) {
  return await fireBaseInstance.firebase.database().ref(`users/${options.companyName}`).set({
    email: options.email,
    companyName: options.companyName
  })
}


export default {
  getUser, getUserEvents, deleteUserFromDb, addEvent, editEvent, deleteEvent
}
