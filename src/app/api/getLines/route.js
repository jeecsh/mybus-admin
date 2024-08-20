import { db } from '../../lib/firebaseAdmin.js';

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