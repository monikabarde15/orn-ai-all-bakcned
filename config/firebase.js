const admin = require("firebase-admin");
const dotenv = require("dotenv");
dotenv.config();

// Initialize firebase admin with your service account
const admin = require("firebase-admin");

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = { admin, firebaseApp };
