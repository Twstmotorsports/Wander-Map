import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export type UserProfile = {
  email: string;
  displayName?: string | null;
  photoURL?: string | null;
};

export async function getUserProfile(
  userId: string
): Promise<UserProfile | null> {
  const userRef = doc(db, 'users', userId);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data() as any;

  return {
    email: data.email ?? '',
    displayName: data.displayName ?? null,
    photoURL: data.photoURL ?? null,
  };
}

export async function updateUserProfile(
  userId: string,
  data: Partial<Pick<UserProfile, 'displayName' | 'photoURL'>>
): Promise<void> {
  const userRef = doc(db, 'users', userId);
  await setDoc(userRef, data, { merge: true });
}
