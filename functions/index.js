const nodemailer = require("nodemailer");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: "flashdevscheduler@gmail.com",
    pass: "scheduler1!s",
  }
});


exports.sendMailToContact = functions.firestore.document(`users/{userId}/email`)
  .onCreate((snap, context) => {
    const text = `
                    <div>
                    <h1>Hello ${snap.data().companyName}</h1>

                    <br>
                    <h6>email address: ${snap.data().email}</h6>
                    <br>

                    <br>
                    <h6>content: ${snap.data().password}</h6>
                    </div>
        <br>`;

    return transporter.sendMail( (error, info) => {
      if (error) {
        console.error("error:", error.message);
      } else console.log("SUCCESSES!!", info)
    })
  })
