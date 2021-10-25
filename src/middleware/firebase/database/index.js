import fireBaseInstance from '../';
import {log} from "@quasar/app/lib/helpers/logger";

 async function getAllUsers() {
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
async function getAllUsersEvents(){
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


 async function addEvent(options) {
   if (options.event.file !== null) {
     const file = options.event.file;
     let storageRef = fireBaseInstance.firebase.storage().ref();
     let imageStorageRef = storageRef.child(`${options.companyName}`).child(`${options.event.date}`).child(`${file.name}`)
     await imageStorageRef.put(file).then(() => {
       imageStorageRef.getDownloadURL()
         .then((url) => {
           options.event.file = url
           return fireBaseInstance.firebase.database().ref(`users/${options.companyName}/events/${options.event.date}/${options.event.title}`).set(options.event)
         }).catch(err => console.log(err))
     })
   }
}

function editEvent(options) {
    return fireBaseInstance.firebase.database().ref(`users/${options.companyName}/events/${options.event.date}/${options.event.eventKey}`).set(options.event)
}


export async function getUserEvents(companyName) {
    return await fireBaseInstance.firebase.database().ref(`users/${companyName}/events`).once('value')
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

 async function addUser(options) {
  return await fireBaseInstance.firebase.database().ref(`users/${options.companyName}`).set({
    email: options.email,
    companyName: options.companyName,
    password: options.password
  })
}

 function deleteEvent(event, companyName){
  return fireBaseInstance.firebase.database().ref(`users/${companyName}/events/${event.title}`).remove()
}

export default {
    getUser, getUserEvents, deleteUserFromDb, addEvent, editEvent, getAllUsers, addUser, deleteEvent, getAllUsersEvents
}
