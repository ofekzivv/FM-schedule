import fireBaseInstance from '../';


function getUser(options) {
  return fireBaseInstance.firebase.database().ref(`users/${window.user.uid}`).once('value')
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

function getUserEvents(options) {
  return fireBaseInstance.firebase.database().ref(`users/${window.user.uid}/events`).once('value')
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
  debugger
  return await fireBaseInstance.firebase.database().ref(`users/${window.user.uid}`).set({name: options.name, email: options.email, companyName: options.companyName})
}

export default {
  getUser, getUserEvents, addUser
}
