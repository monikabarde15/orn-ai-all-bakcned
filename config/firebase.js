const admin = require("firebase-admin");

let firebaseApp;

try {
  if (
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY
  ) {
    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      }),
    });

    console.log("Firebase Connected");
  } else {
    console.log("Firebase ENV not found, skipping firebase init");
  }
} catch (error) {
  console.log("Firebase Init Error:", error.message);
}

module.exports = admin;