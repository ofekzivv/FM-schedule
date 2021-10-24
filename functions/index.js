const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.setUserDataToFB = functions.auth.user().onCreate(userRecord => {
  let newUser = {
    fullName: userRecord.displayName,
    email: userRecord.email,
  }
  admin.firestore().collection('usersInfo').doc(userRecord.uid).set(newUser)
    .then(()=>{
      console.log('newUser: ',newUser)
    })
})
