import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Guide } from '../types';

type GuidesResult = {
  guides: Guide[];
  isLoading: boolean;
  error: string | null;
};

export function useGuides(userId: string): GuidesResult {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const guidesQuery = query(
      collection(db, 'guides'),
      where('userId', '==', userId)
    );

    const unsubscribe = onSnapshot(
      guidesQuery,
      (snapshot) => {
        const nextGuides: Guide[] = snapshot.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<Guide, 'id'>),
        }));
        setGuides(nextGuides);
        setIsLoading(false);
      },
      (err) => {
        console.error('Error loading guides from Firestore:', err);
        setError('Unable to load your guides. Please try again.');
        setIsLoading(false);
      }
    );

    return unsubscribe;
  }, [userId]);

  return { guides, isLoading, error };
}
