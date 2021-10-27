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

async function getAllUsersEvents() {
  let events = [];
  return await fireBaseInstance.firebase.database().ref('users').once('value')
    .then(async res => {
      const arr = [];
      const map = res.val();
      for (const key in map) {
        const item = map[key];
        arr.push(item);
      }
      for (let i = 0; i < arr.length; i++) {
        let dates = arr[i].events
        for (const date in dates) {
          let key = dates[date]
          for (const event in key) {
            key[event].companyName = arr[i].companyName
            events.push(key[event])
          }
        }
      }
      console.log(events)
      return events
    })
}

/*function getUserPassword(companyName) {
  return fireBaseInstance.firebase.database().ref(`users/${companyName}`).once('value')
    .then(res => {
      return res.val().password
    })
}*/

async function getUser(companyName) {
  return await fireBaseInstance.firebase.database().ref(`users/${companyName}`).once('value')
    .then(res => {
      return res.val();
    })
}

async function deleteUserFromDb(companyName, password) {
  await fireBaseInstance.firebase.database().ref(`users/${companyName}`).remove().then(() => {
    let storageRef = fireBaseInstance.firebase.storage().ref().child(`${password}`);
    // Now we get the references of these files
    storageRef.listAll().then(function (result) {
      result.items.forEach(function (file) {
        file.delete();
      });
    }).catch(function (error) {
      // Handle any errors
    });
  }).catch(err => console.log(err))
}


async function addEvent(options) {
  if (options.event.files) {
    let timeStamp = Date.now()
    let fileLinks = []
    let index = 0
    for (let file of options.event.files) {
      timeStamp = timeStamp + index
      let storageRef = fireBaseInstance.firebase.storage().ref()
      let imageStorageRef = storageRef.child(`${options.password}`).child(`${timeStamp}`)
      index++
      await imageStorageRef.put(file)
      await imageStorageRef.getDownloadURL()
        .then((url) => {
          fileLinks.push({
            url,
            timeStamp
          })
        }).catch(err => console.log(err))
    }
    options.event.files = fileLinks
    return fireBaseInstance.firebase.database().ref(`users/${options.companyName}/events/${options.event.date}/${options.event.eventKey}`).set(options.event)
  } else {
    return fireBaseInstance.firebase.database().ref(`users/${options.companyName}/events/${options.event.date}/${options.event.eventKey}`).set(options.event)
  }
}

function editEvent(options) {
  return fireBaseInstance.firebase.database().ref(`users/${options.company}/events/${options.event.date}/${options.event.eventKey}`).update(options.event)
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
    email: options.email,
    companyName: options.companyName,
    password: options.password,
  })
}

async function addLogoToStorage(file, password, newUser) {
  let storageRef = fireBaseInstance.firebase.storage().ref();
  let imageStorageRef = storageRef.child(`${password}`).child('logo')
  if (!newUser) {
    if (await imageStorageRef.getDownloadURL() !== null) {
      await imageStorageRef.delete()
    }
  }
  await imageStorageRef.put(file)
  return await imageStorageRef.getDownloadURL()
    .then((url) => {
      return url
    }).catch(err => console.log(err))
}

async function addUser(options) {
  if (typeof options.logo === 'object') {
    options.logo = await addLogoToStorage(options.logo, options.password, options.newUser)
  }
  return await fireBaseInstance.firebase.database().ref(`users/${options.companyName}`).set({
    email: options.email,
    companyName: options.companyName,
    password: options.password,
    logo: options.logo,
    color: options.color
  }).then(async () => {
    if (options.events) {
      for (let i = 0; i < options.events.length; i++) {
        await this.addEvent({companyName: options.companyName, event: options.events[i]})
      }
    }
  })
}

function deleteEvent(password, event, companyName) {
  for (let userFile of event.files) {
    console.log(userFile.timeStamp)
    let storageRef = fireBaseInstance.firebase.storage().ref().child(`${password}/${userFile.timeStamp}`)
    storageRef.delete().then(() => console.log('file deleted', userFile.timeStamp)).catch(err => console.log(err));
  }
  return fireBaseInstance.firebase.database().ref(`users/${companyName}/events/${event.date}/${event.eventKey}`).remove()
}

async function editUser(options) {
  if (typeof options.logo === 'object') {
    options.logo = await addLogoToStorage(options.logo, options.password)
  }
  return await fireBaseInstance.firebase.database().ref(`users/${options.companyName}`).update({
    email: options.email,
    logo: options.logo,
    color: options.color
  })
}

async function getUserColorFb(companyName) {
  return await fireBaseInstance.firebase.database().ref(`users/${companyName}`).get().then(snapshot => {
    let color = snapshot.val()
    return color.color
  })
}

export async function getCompanyNameByEmail(email) {
  const res = await fireBaseInstance.firebase.database().ref(`users/`).once('value')

  const map = res.val()
  for (const x in map) {
    const user = map[x]
    if (user.email === email) {
      return await user.companyName
    }
  }
}

async function getAllAdmins() {
  return await fireBaseInstance.firebase.database().ref('admins').once('value')
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

async function deleteAdminFromDb(name) {
  return await fireBaseInstance.firebase.database().ref(`admins/${name}`).remove().then(() => {
    console.log('the user was removed from db')
  }).catch(err => err)
}

async function updateAdmin(origName, admin) {
  return await fireBaseInstance.firebase.database().ref(`admins/${admin.name}`).set({
    companyName: admin.companyName,
    email: admin.email,
    password: admin.password
  }).then(async () => {
    await this.deleteUserFromDb(origName)
  })
}

function getAdmin(name) {
  return fireBaseInstance.firebase.database().ref(`admins/${name}`).get().then((res) => {
    return res.val()
  })
}

export default {
  getUser, getUserEvents, deleteUserFromDb, addEvent, editEvent, getAllUsers, addUser, deleteEvent, getAllUsersEvents,
  editUser, getAllAdmins, updateAdmin, deleteAdminFromDb, addAdmin, getUserColorFb, getAdmin
}
