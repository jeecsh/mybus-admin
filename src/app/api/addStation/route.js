import { NextApiRequest, NextApiResponse } from 'next';
import firebaseAdmin from 'firebase-admin';

// Initialize Firebase Admin SDK if not already initialized
if (!firebaseAdmin.apps.length) {
    const serviceAccount = require('../../../../../credentials/sdkfirebase.json');
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(serviceAccount)
    });
}

const db = firebaseAdmin.firestore();

export default async function handler(req = NextApiRequest, res = NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const data = req.body;
      const docRef = await db.collection('stations').add(data);
      res.status(200).json({ message: 'Station added successfully', station_id: docRef.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}