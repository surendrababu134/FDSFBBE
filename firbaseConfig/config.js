const admin=require('firebase-admin');

var serviceAccount = require('../firebasetoken/service_account.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fdsdb-62138-default-rtdb.firebaseio.com",
    storageBucket: "fdsdb-62138.appspot.com",
    authDomain: "fdsdb-62138.firebaseapp.com",
  });

var db=admin.database();
module.exports = db;
