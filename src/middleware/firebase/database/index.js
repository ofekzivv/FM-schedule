import fireBaseInstance from '../';

/*
getAllUsers returns all of the users as array of users
*/

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

/*
getAllUsersEvents returns all of the users events as array
*/
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
      return events
    })
}

/*function getUserPassword(companyName) {
  return fireBaseInstance.firebase.database().ref(`users/${companyName}`).once('value')
    .then(res => {
      return res.val().password
    })
}*/

/*
getUser returns user
*/
async function getUser(companyName) {
  return await fireBaseInstance.firebase.database().ref(`users/${companyName}`).once('value')
    .then(res => {
      return res.val();
    })
}

/*
deleteUserFromDb deletes a user from the DB, realtime and storage
*/
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

/* addFilesToStorage is uploading the files to the fireBase storage */
async function addFilesToStorage(files, password) {
  let timeStamp = Date.now()
  let fileLinks = []
  let index = 0
  for (let file of files) {
    timeStamp = timeStamp + index
    let storageRef = fireBaseInstance.firebase.storage().ref()
    let imageStorageRef = storageRef.child(`${password}`).child(`${timeStamp}`)
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
  return fileLinks
}

/*
addEvent adds an event under the user in the DB and adds event files to storage
*/
async function addEvent(options) {
  if (options.event.files) {
    await addFilesToStorage(options.event.files, options.password).then(fileLinks => {
      options.event.files = fileLinks
      return fireBaseInstance.firebase.database().ref(`users/${options.companyName}/events/${options.event.date}/${options.event.eventKey}`).set(options.event)
    })
  } else {
    return fireBaseInstance.firebase.database().ref(`users/${options.companyName}/events/${options.event.date}/${options.event.eventKey}`).set(options.event)
  }
}
/*
editEvent updates the event
*/
async function editEvent(options) {
  if (options.newFiles) {
    await addFilesToStorage(options.newFiles, options.password).then(fileLinks => {
      const oldFiles = options.event.files
      options.event.files = oldFiles.concat(fileLinks)
    })
  }
  return fireBaseInstance.firebase.database().ref(`users/${options.company}/events/${options.event.date}/${options.event.eventKey}`).update(options.event)
}

/*
getUserEvents returns all of the events for a single user
*/
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
/*
 addAdmin adds inserted admin to the DB
*/
async function addAdmin(options) {
  return await fireBaseInstance.firebase.database().ref(`admins/${options.companyName}`).set({
    email: options.email,
    companyName: options.companyName,
    password: options.password,
    uid: options.uid
  })
}
/*
addLogoToStorage adds the company logo to storage, if already exists delete the previous logo
*/
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

/*
addUser adds a user to the DB
*/
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

/*
deleteEvent deletes an event from the DB and the events files from storage
*/
async function deleteEvent(password, event, companyName) {
  if (event.files) {
    for (let userFile of event.files) {
      let storageRef = fireBaseInstance.firebase.storage().ref().child(`${password}/${userFile.timeStamp}`)
      await storageRef.delete().then(() => console.log('file deleted', userFile.timeStamp)).catch(err => console.log(err));
    }
  }
  return fireBaseInstance.firebase.database().ref(`users/${companyName}/events/${event.date}/${event.eventKey}`).remove()
}
// editUser edits the user in the DB and changes logo in storage if changed
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

/* getUserColorFb gets the company color */
async function getUserColorFb(companyName) {
  return await fireBaseInstance.firebase.database().ref(`users/${companyName}`).get().then(snapshot => {
    let color = snapshot.val()
    return color.color
  })
}

/* editFilesInStorage is removing oldfiles from storage */
async function editFilesInStorage(newFiles, password, oldFiles) {
  let storageRef = await fireBaseInstance.firebase.storage().ref().child(`${password}`)
  let difference = oldFiles.filter(x => !newFiles.includes(x));
  for (let file of difference) {
    await storageRef.child(`${file.timeStamp}`).delete()
  }
}

/*
 gets company name with company Email address
*/
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

/*
getAllAdmins gets all admins as an array
*/
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

/*
deleteAdminFromDb deletes admin for DB
*/
async function deleteAdminFromDb(name) {
  return await fireBaseInstance.firebase.database().ref(`admins/${name}`).remove().then(() => {
    console.log('the user was removed from db')
  }).catch(err => err)
}

/*
updateAdmin updates admin in DB
*/
async function updateAdmin(origName, admin) {
  return await fireBaseInstance.firebase.database().ref(`admins/${admin.name}`).set({
    companyName: admin.companyName,
    email: admin.email,
    password: admin.password
  }).then(async () => {
    await this.deleteUserFromDb(origName)
  })
}

/*
 getAdmin gets a single admin from db
*/
function getAdmin(name) {
  return fireBaseInstance.firebase.database().ref(`admins/${name}`).get().then((res) => {
    return res.val()
  })
}

/*
 checkAdmin checks if the user entering the system is an admin or not, returns true if admin and false if user
*/
export async function checkAdmin(email, password) {
  const admins = await getAllAdmins()
  for (let i = 0; i < admins.length; i++) {
    if (admins[i].email === email && admins[i].password === password) {
      console.log('isadmin:true')
      return true
    }
  }
  return false
}

export default {
  getUser, getUserEvents, deleteUserFromDb, addEvent, editEvent, getAllUsers, addUser, deleteEvent, getAllUsersEvents,
  editUser, getAllAdmins, updateAdmin, deleteAdminFromDb, addAdmin, getUserColorFb, getAdmin, editFilesInStorage
}
