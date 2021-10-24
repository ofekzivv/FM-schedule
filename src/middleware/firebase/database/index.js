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
export async function getAllUsersEvents(){
  let events = [];
  return await fireBaseInstance.firebase.database().ref('users').once('value')
    .then(res => {
      const arr = [];
      const map = res.val();
      for (const key in map) {
        const item = map[key];
        item.id = key;
        arr.push(item);
      }
      for (let i = 0; i < arr.length; i++) {
        let dates = arr[i].events
        for (const date in dates) {
          let key = dates[date]
          for (const event in key) {
            key[event].companyName = arr[i].companyName
            key[event].bgcolor = undefined
            key[event].eventKey =undefined
            key[event].icon = undefined
            debugger
            events.push(key[event])
          }
        }
      }
      debugger
      console.log(events)
      return events
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
  return await fireBaseInstance.firebase.database().ref(`users/${options.id}`).set({
    email: options.email,
    companyName: options.companyName,
    id: options.id,
    password: options.password
  })
}

async function editUser(options) {
  return await fireBaseInstance.firebase.database().ref(`users/${options.oldCompanyName}`).set({
    email: options.email,
    companyName: options.companyName,
  })
}


export default {
  getUser, getUserEvents, deleteUserFromDb, addEvent, editEvent, editUser
}
