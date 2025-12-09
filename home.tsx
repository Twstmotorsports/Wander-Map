// home.tsx
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Screen,
  Trip,
  Guide,
  TripFormMode,
  GuideFormMode,
} from './src/types';
import { styles } from './src/styles';
import { HomeScreenView as HomeScreen } from './src/screens/HomeScreen';
import { AddChoiceScreenView as AddChoiceScreen } from './src/screens/AddChoiceScreen';
import { TripFormScreen } from './src/screens/TripFormScreen';
import { TripListScreen } from './src/screens/TripListScreen';
import { GuideFormScreen } from './src/screens/GuideFormScreen';
import { GuideListScreen } from './src/screens/GuideListScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { SearchScreen } from './src/screens/SearchScreen';
import { db } from './src/firebaseConfig';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

export default function HomeApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('HOME');
  const [trips, setTrips] = useState<Trip[]>([]);
  const [guides, setGuides] = useState<Guide[]>([]);
  const [editingTripId, setEditingTripId] = useState<string | null>(null);
  const [editingGuideId, setEditingGuideId] = useState<string | null>(null);

  const currentEditingTrip = editingTripId
    ? trips.find((trip) => trip.id === editingTripId) ?? null
    : null;
  const currentEditingGuide = editingGuideId
    ? guides.find((guide) => guide.id === editingGuideId) ?? null
    : null;

  useEffect(() => {
    const loadData = async () => {
      try {
        const tripsSnapshot = await getDocs(collection(db, 'trips'));
        const loadedTrips: Trip[] = tripsSnapshot.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<Trip, 'id'>),
        }));
        setTrips(loadedTrips);

        const guidesSnapshot = await getDocs(collection(db, 'guides'));
        const loadedGuides: Guide[] = guidesSnapshot.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<Guide, 'id'>),
        }));
        setGuides(loadedGuides);
      } catch (error) {
        console.error('Error loading data from Firestore:', error);
      }
    };

    loadData();
  }, []);

  const openCreateTrip = () => {
    setEditingTripId(null);
    setCurrentScreen('TRIP_FORM');
  };

  const openCreateGuide = () => {
    setEditingGuideId(null);
    setCurrentScreen('GUIDE_FORM');
  };

  const handleSaveTrip = async (
    mode: TripFormMode,
    data: Omit<Trip, 'id'>
  ) => {
    try {
      if (mode === 'create') {
        const docRef = await addDoc(collection(db, 'trips'), data);
        const newTrip: Trip = {
          id: docRef.id,
          ...data,
        };
        setTrips((prev) => [...prev, newTrip]);
      } else if (mode === 'edit' && editingTripId) {
        const tripRef = doc(db, 'trips', editingTripId);
        await updateDoc(tripRef, data);
        setTrips((prev) =>
          prev.map((trip) =>
            trip.id === editingTripId ? { ...trip, ...data } : trip
          )
        );
      }
      setCurrentScreen('TRIP_LIST');
    } catch (error) {
      console.error('Error saving trip:', error);
    }
  };

  const handleDeleteTrip = async () => {
    try {
      if (!editingTripId) {
        setCurrentScreen('TRIP_LIST');
        return;
      }
      await deleteDoc(doc(db, 'trips', editingTripId));
      setTrips((prev) => prev.filter((trip) => trip.id !== editingTripId));
      setEditingTripId(null);
      setCurrentScreen('TRIP_LIST');
    } catch (error) {
      console.error('Error deleting trip:', error);
    }
  };

  const handleSaveGuide = async (
    mode: GuideFormMode,
    data: Omit<Guide, 'id'>
  ) => {
    try {
      if (mode === 'create') {
        const docRef = await addDoc(collection(db, 'guides'), data);
        const newGuide: Guide = {
          id: docRef.id,
          ...data,
        };
        setGuides((prev) => [...prev, newGuide]);
      } else if (mode === 'edit' && editingGuideId) {
        const guideRef = doc(db, 'guides', editingGuideId);
        await updateDoc(guideRef, data);
        setGuides((prev) =>
          prev.map((guide) =>
            guide.id === editingGuideId ? { ...guide, ...data } : guide
          )
        );
      }
      setCurrentScreen('GUIDE_LIST');
    } catch (error) {
      console.error('Error saving guide:', error);
    }
  };

  const handleDeleteGuide = async () => {
    try {
      if (!editingGuideId) {
        setCurrentScreen('GUIDE_LIST');
        return;
      }
      await deleteDoc(doc(db, 'guides', editingGuideId));
      setGuides((prev) => prev.filter((guide) => guide.id !== editingGuideId));
      setEditingGuideId(null);
      setCurrentScreen('GUIDE_LIST');
    } catch (error) {
      console.error('Error deleting guide:', error);
    }
  };

  const openTripList = () => {
    setCurrentScreen('TRIP_LIST');
  };

  const openGuideList = () => {
    setCurrentScreen('GUIDE_LIST');
  };

  const openProfile = () => {
    setCurrentScreen('PROFILE');
  };

  const openSearch = () => {
    setCurrentScreen('SEARCH');
  };

  const openHome = () => {
    setCurrentScreen('HOME');
  };

  const openTripForEdit = (id: string) => {
    setEditingTripId(id);
    setCurrentScreen('TRIP_FORM');
  };

  const openGuideForEdit = (id: string) => {
    setEditingGuideId(id);
    setCurrentScreen('GUIDE_FORM');
  };

  let content: React.ReactElement | null = null;

  if (currentScreen === 'HOME') {
    content = (
      <HomeScreen
        onAdd={() => setCurrentScreen('ADD_CHOICE')}
        onViewTrips={openTripList}
        onViewGuides={openGuideList}
        onProfile={openProfile}
        onSearch={openSearch}
      />
    );
  } else if (currentScreen === 'ADD_CHOICE') {
    content = (
      <AddChoiceScreen
        onBack={openHome}
        onChooseTrip={openCreateTrip}
        onChooseGuide={openCreateGuide}
      />
    );
  } else if (currentScreen === 'TRIP_FORM') {
    const mode: TripFormMode = editingTripId ? 'edit' : 'create';
    content = (
      <TripFormScreen
        key={editingTripId ?? 'create'}
        mode={mode}
        initialTrip={currentEditingTrip}
        onSave={handleSaveTrip}
        onCancel={openTripList}
        onDelete={mode === 'edit' ? handleDeleteTrip : undefined}
      />
    );
  } else if (currentScreen === 'TRIP_LIST') {
    content = (
      <TripListScreen
        trips={trips}
        onBack={openHome}
        onSelectTrip={openTripForEdit}
      />
    );
  } else if (currentScreen === 'GUIDE_FORM') {
    const mode: GuideFormMode = editingGuideId ? 'edit' : 'create';
    content = (
      <GuideFormScreen
        key={editingGuideId ?? 'create'}
        mode={mode}
        initialGuide={currentEditingGuide}
        onSave={handleSaveGuide}
        onCancel={openGuideList}
        onDelete={mode === 'edit' ? handleDeleteGuide : undefined}
      />
    );
  } else if (currentScreen === 'GUIDE_LIST') {
    content = (
      <GuideListScreen
        guides={guides}
        onBack={openHome}
        onSelectGuide={openGuideForEdit}
      />
    );
  } else if (currentScreen === 'PROFILE') {
    content = <ProfileScreen onBack={openHome} />;
  } else if (currentScreen === 'SEARCH') {
    content = (
      <SearchScreen
        trips={trips}
        guides={guides}
        onBack={openHome}
        onOpenTrip={openTripForEdit}
        onOpenGuide={openGuideForEdit}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      {content}
    </SafeAreaView>
  );
}