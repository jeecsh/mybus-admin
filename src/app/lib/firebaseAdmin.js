// src/app/lib/firebaseAdmin.js
import admin from 'firebase-admin';

const serviceAccount = require('../../../credentials/sdkfirebase.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

export { db };
