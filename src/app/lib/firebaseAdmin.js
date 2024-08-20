// src/app/lib/firebaseAdmin.js

import path from 'path';
import fs from 'fs';

var admin =require("firebase-admin");



const serviceAccount = require('../../../credentials/secrets.json');

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:"https://console.firebase.google.com/project/my-bus-421811/database/my-bus-421811-default-rtdb/data/?pli=1"
  });
}

const db = admin.firestore();

export { db };
