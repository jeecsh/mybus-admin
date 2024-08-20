import { db } from '../../lib/firebaseAdmin';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const data = await req.json(); // Parse the request body as JSON
    console.log('Received data:', data); // Log the request body
    
    // Input validation (example)
    if (!data || typeof data !== 'object') {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }
    
    // Add document to Firestore
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
