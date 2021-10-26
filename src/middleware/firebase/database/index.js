import fireBaseInstance from '../';

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
            events.push(key[event])
          }
        }
      }
      console.log(events)
      return events
    })
}
function getUserPassword(companyName) {
  return fireBaseInstance.firebase.database().ref(`users/${companyName}`).once('value')
    .then(res => {
      return res.val().password
    })
}
async function getUser(companyName) {
     return await fireBaseInstance.firebase.database().ref(`users/${companyName}`).once('value')
        .then(res => {
            return res.val();
        })
}

function deleteUserFromDb(companyName) {
    return fireBaseInstance.firebase.database().ref(`users/${companyName}`).remove().then(() => {
        console.log('the user was removed from db')
    }).catch(err => err)
}


async function addEvent(options) {
  if (options.event.files) {
    let fileLinks = []
    for (let file of options.event.files) {
      let storageRef = fireBaseInstance.firebase.storage().ref();
      let imageStorageRef = storageRef.child(`${file.name}`)
      await imageStorageRef.put(file)
      await imageStorageRef.getDownloadURL()
        .then((url) => {
          fileLinks.push(url)
        }).catch(err => console.log(err))
    }
    options.event.files = fileLinks
    return fireBaseInstance.firebase.database().ref(`users/${options.companyName}/events/${options.event.date}/${options.event.title}`).set(options.event)
  } else {
    return fireBaseInstance.firebase.database().ref(`users/${options.companyName}/events/${options.event.date}/${options.event.title}`).set(options.event)
  }
}

function editEvent(options) {
    return fireBaseInstance.firebase.database().ref(`users/${options.companyName}/events/${options.event.date}/${options.event.eventKey}`).set(options.event)
}


export async function getUserEvents(companyName) {
    return await fireBaseInstance.firebase.database().ref(`users/${companyName}/events`).once('value')
        .then(res => {
          console.log(`${companyName} in index db`)
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
async function addAdmin(options) {
  return await fireBaseInstance.firebase.database().ref(`admins/${options.companyName}`).set({

  })
}
async function addUser(options) {
  let file = options.logo
  let storageRef = fireBaseInstance.firebase.storage().ref();
  let imageStorageRef = storageRef.child(`${file.name}`)
  await imageStorageRef.put(file)
  await imageStorageRef.getDownloadURL()
    .then((url) => {
      file = url;
    }).catch(err => console.log(err))
  options.logo = file
  return await fireBaseInstance.firebase.database().ref(`users/${options.companyName}`).set({
    email: options.email,
    companyName: options.companyName,
    password: options.password,
    logo: options.logo,
    color: options.color
  }).then(async () => {
    if(options.events) {
      for (let i = 0; i < options.events.length; i++) {
          await this.addEvent({companyName: options.companyName, event: options.events[i]})
        }
    }
  })

   }

 function deleteEvent(event, companyName){
  return fireBaseInstance.firebase.database().ref(`users/${companyName}/events/${event.title}`).remove()
}

async function setNewEmail(options) {
  return await fireBaseInstance.firebase.database().ref(`users/${options.companyName}`).update({email: options.email})
}

 export async function getCompanyNameByEmail(email) {
   debugger
  const res = await fireBaseInstance.firebase.database().ref(`users/`).once('value')
   debugger
      const map = res.val()
      for (const x in map) {
        const user = map[x]
        if (user.email === email) {
          debugger
          return await user.companyName
        }
      }
}

export default {
    getUser, getUserEvents, deleteUserFromDb, addEvent, editEvent, getAllUsers, addUser, deleteEvent, getAllUsersEvents,
  setNewEmail, addAdmin
}
