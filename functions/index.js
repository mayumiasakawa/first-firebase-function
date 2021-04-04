const admin = require('firebase-admin');
const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

admin.initializeApp();
var db = admin.firestore();

exports.helloWorld = functions.https.onRequest(
  (request,response) => {
    db.collection('people').get()
    .then((snapshot)=> {
      var res = [];
      snapshot.forEach((doc) => {
        res.push(doc.data());
      });
      response.send(JSON.stringify(res));
    })
    .catch((err)=> {
      response.send(err.localizedDescription);
    });
  }
)