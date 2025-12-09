import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Trip } from '../types';

export async function createTripForUser(
  userId: string,
  data: Omit<Trip, 'id' | 'userId'>
): Promise<Trip> {
  const payload: Omit<Trip, 'id'> = {
    userId,
    ...data,
  };

  const docRef = await addDoc(collection(db, 'trips'), payload);

  return {
    id: docRef.id,
    ...payload,
  };
}

export async function updateTrip(
  tripId: string,
  data: Omit<Trip, 'id' | 'userId'>
): Promise<void> {
  const tripRef = doc(db, 'trips', tripId);
  await updateDoc(tripRef, data);
}

export async function deleteTrip(tripId: string): Promise<void> {
  const tripRef = doc(db, 'trips', tripId);
  await deleteDoc(tripRef);
}
