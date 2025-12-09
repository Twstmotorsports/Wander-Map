import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Guide } from '../types';

export async function createGuideForUser(
  userId: string,
  data: Omit<Guide, 'id' | 'userId'>
): Promise<Guide> {
  const payload: Omit<Guide, 'id'> = {
    userId,
    ...data,
  };

  const docRef = await addDoc(collection(db, 'guides'), payload);

  return {
    id: docRef.id,
    ...payload,
  };
}

export async function updateGuide(
  guideId: string,
  data: Omit<Guide, 'id' | 'userId'>
): Promise<void> {
  const guideRef = doc(db, 'guides', guideId);
  await updateDoc(guideRef, data);
}

export async function deleteGuide(guideId: string): Promise<void> {
  const guideRef = doc(db, 'guides', guideId);
  await deleteDoc(guideRef);
}
