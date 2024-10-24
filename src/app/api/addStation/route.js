                                                                                                                                                            import { db } from '../../lib/firebaseAdmin';
                                                                                                                                                            import { NextResponse } from 'next/server';

                                                                                                                                                            // Function to fetch all station IDs
                                                                                                                                                            const fetchStationIds = async () => {
                                                                                                                                                              try {
                                                                                                                                                                const snapshot = await db.collection('Bus-stations').get();
                                                                                                                                                                return snapshot.docs.map(doc => doc.id);
                                                                                                                                                              } catch (error) {
                                                                                                                                                                console.error('Error fetching station IDs:', error);
                                                                                                                                                                throw new Error('Error fetching station IDs');
                                                                                                                                                              }
                                                                                                                                                            };

                                                                                                                                                            // Function to increment ID
                                                                                                                                                            const incrementId = (id) => {
                                                                                                                                                              const match = id.match(/(\D+)(\d+)$/); // Regex to match letter(s) and numeric suffix
                                                                                                                                                              if (match) {
                                                                                                                                                                const prefix = match[1]; // Letter(s) part
                                                                                                                                                                const numberPart = match[2]; // Numeric part
                                                                                                                                                                const newIdNumber = (parseInt(numberPart, 10) + 1).toString().padStart(numberPart.length, '0'); // Increment and pad
                                                                                                                                                                return `${prefix}${newIdNumber}`;
                                                                                                                                                              }
                                                                                                                                                              return id; // Return unchanged if format does not match
                                                                                                                                                            };

                                                                                                                                                            // Function to shift station IDs
                                                                                                                                                            const shiftStationIds = async (newId) => {
                                                                                                                                                              try {
                                                                                                                                                                const existingIds = await fetchStationIds();
                                                                                                                                                                const prefix = newId.match(/(\D+)(\d+)$/)[1];
                                                                                                                                                                const idsToShift = existingIds
                                                                                                                                                                  .filter(id => id.startsWith(prefix) && id >= newId)
                                                                                                                                                                  .sort()
                                                                                                                                                                  .reverse(); // Sort descending to avoid conflicts
                                                                                                                                                                
                                                                                                                                                                const batch = db.batch();
                                                                                                                                                                idsToShift.forEach(id => {
                                                                                                                                                                  const incrementedId = incrementId(id);
                                                                                                                                                                  const docRef = db.collection('Bus-stations').doc(id);
                                                                                                                                                                  batch.update(docRef, { id: incrementedId });
                                                                                                                                                                });
                                                                                                                                                                await batch.commit();
                                                                                                                                                              } catch (error) {
                                                                                                                                                                console.error('Error shifting station IDs:', error);
                                                                                                                                                                throw new Error('Error shifting station IDs');
                                                                                                                                                              }
                                                                                                                                                            };

                                                                                                                                                            export async function GET(req) {
                                                                                                                                                              try {
                                                                                                                                                                const snapshot = await db.collection('Bus-stations').get();
                                                                                                                                                                const busStations = snapshot.docs.map(doc => ({
                                                                                                                                                                  id: doc.id,
                                                                                                                                                                  ...doc.data()
                                                                                                                                                                }));
                                                                                                                                                                return NextResponse.json(busStations, { status: 200 });
                                                                                                                                                              } catch (error) {
                                                                                                                                                                console.error('Error fetching bus stations:', error);
                                                                                                                                                                return NextResponse.json({ error: error.message }, { status: 500 });
                                                                                                                                                              }
                                                                                                                                                            }

                                                                                                                                                            export async function POST(req) {
                                                                                                                                                              try {
                                                                                                                                                                const data = await req.json();
                                                                                                                                                                console.log('Received data:', data);

                                                                                                                                                                if (!data || typeof data !== 'object' || !data.Id) {
                                                                                                                                                                  return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
                                                                                                                                                                }

                                                                                                                                                                const { Id, name, loc, lines } = data;

                                                                                                                                                                const existingIds = await fetchStationIds();
                                                                                                                                                                if (existingIds.includes(Id)) {
                                                                                                                                                                  await shiftStationIds(Id);
                                                                                                                                                                }

                                                                                                                                                                console.log({Id});

                                                                                                                                                                const docRef = await db.collection('Bus-stations').add({
                                                                                                                                                                  id: Id,
                                                                                                                                                                  name,
                                                                                                                                                                  loc,
                                                                                                                                                                  lines
                                                                                                                                                                });
                                                                                                                                                                return NextResponse.json({ message: 'Station added successfully', station_id: docRef.id }, { status: 201 });
                                                                                                                                                              } catch (error) {
                                                                                                                                                                console.error('Error adding station:', error);
                                                                                                                                                                return NextResponse.json({ error: error.message }, { status: 500 });
                                                                                                                                                              }
                                                                                                                                                            }
