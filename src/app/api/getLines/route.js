import { NextResponse } from 'next/server';
import firebaseAdmin from 'firebase-admin';
import path from 'path';
import fs from 'fs';

// Initialize Firebase Admin SDK if not already initialized
if (!firebaseAdmin.apps.length) {
  const serviceAccountPath = path.resolve(process.cwd(), '../../../../../credentials/sdkfirebase.json');
  
  if (!fs.existsSync(serviceAccountPath)) {
    throw new Error(`Service account key file not found at ${serviceAccountPath}`);
  }

  const serviceAccount = require(serviceAccountPath);
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount)
  });
}

const db = firebaseAdmin.firestore();

export async function GET(req) {
  try {
    const snapshot = await db.collection('buslines').get();
    const busLines = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return NextResponse.json(busLines);
  } catch (error) {
    console.error('Error fetching bus lines:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}