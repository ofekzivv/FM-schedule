const functions = require("firebase-functions");
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: "flashdevscheduler@gmail.com",
    pass: "scheduler1!S"
  }
});

exports.sendMailToContact = functions.database.ref('/users/{usersId}')
  .onCreate((snap, context) => {
    const text = `
                    <head>
                           <meta charset="utf-8">
       <style>
body {background-color: gray;}
h1   {color: #FFA813;}
h3   {color: #272727;}
</style>
</head>
<body>
                    <h1>Flashmedia ⚡</h1>
                    <h2>ברוך הבא ${snap.val().companyName} </h2>
                    <h3>זאת הסיסמא החדשה שלך: ${snap.val().password}</h3>
                    <br>
                    <h4>אם אתה צריך עזרה טכנית, אתה מוזמן להתקשר למספר הבא: 052-6745466</h4>
                  <img src="../src/icon/AppIcon.png" alt="Flash Media logo">
                  </body>
        `;
    let message = {
      from: 'flashmedia <flashdevscheduler@gmail.com>',
      to: `${snap.val().email}`,
      subject: `New user`,
      html: text
    };
    return transporter.sendMail(message, (error, info) => {
      if (error) {
        console.error("error:", error.message);
      } else console.log("SUCCESSES!!", info)
    })
  })
