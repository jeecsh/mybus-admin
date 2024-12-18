import admin from 'firebase-admin';

// Import your service account key from credentials
const serviceAccount = require('../../../credentials/secrets.json');

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://my-bus-421811-default-rtdb.firebaseio.com"
  });
}

// Firestore initialization (no databaseURL needed for Firestore)
const db = admin.firestore();  // Firestore

// Realtime Database initialization
const realtimeDb = admin.database(); // Realtime Database

// Export the initialized databases and admin SDK
export { db, realtimeDb, admin };
