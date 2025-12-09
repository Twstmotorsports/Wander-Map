import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Trip } from '../types';

type TripsResult = {
  trips: Trip[];
  isLoading: boolean;
  error: string | null;
};

export function useTrips(userId: string): TripsResult {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const tripsQuery = query(
      collection(db, 'trips'),
      where('userId', '==', userId)
    );

    const unsubscribe = onSnapshot(
      tripsQuery,
      (snapshot) => {
        const nextTrips: Trip[] = snapshot.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<Trip, 'id'>),
        }));
        setTrips(nextTrips);
        setIsLoading(false);
      },
      (err) => {
        console.error('Error loading trips from Firestore:', err);
        setError('Unable to load your trips. Please try again.');
        setIsLoading(false);
      }
    );

    return unsubscribe;
  }, [userId]);

  return { trips, isLoading, error };
}
