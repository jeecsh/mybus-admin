import { NextResponse } from 'next/server';
import firebaseAdmin from 'firebase-admin';
import path from 'path';
import fs from 'fs';

// Initialize Firebase Admin SDK if not already initialized
if (!firebaseAdmin.apps.length) {
  const serviceAccountPath = path.resolve(process.cwd(), 'credentials/sdkfirebase.json');
  
  if (!fs.existsSync(serviceAccountPath)) {
    throw new Error(`Service account key file not found at ${serviceAccountPath}`);
  }

  const serviceAccount = require(serviceAccountPath);
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount)
  });
}

const db = firebaseAdmin.firestore();

export async function POST(req) {
  try {
    const data = await req.json(); // Parse the request body as JSON
    console.log('Received data:', data); // Log the request body
    const docRef = await db.collection('routes').add(data);
    return NextResponse.json({ message: 'Route added successfully', route_id: docRef.id });
  } catch (error) {
    console.error('Error adding route:', error); // Log the error details
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}
