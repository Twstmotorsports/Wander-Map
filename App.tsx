import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
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

export default function App() {
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

  const openCreateTrip = () => {
    setEditingTripId(null);
    setCurrentScreen('TRIP_FORM');
  };

  const openCreateGuide = () => {
    setEditingGuideId(null);
    setCurrentScreen('GUIDE_FORM');
  };

  const handleSaveTrip = (mode: TripFormMode, data: Omit<Trip, 'id'>) => {
    if (mode === 'create') {
      const newTrip: Trip = {
        id: Date.now().toString(),
        ...data,
      };
      setTrips((prev) => [...prev, newTrip]);
    } else if (mode === 'edit' && editingTripId) {
      setTrips((prev) =>
        prev.map((trip) =>
          trip.id === editingTripId ? { ...trip, ...data } : trip
        )
      );
    }
    setCurrentScreen('TRIP_LIST');
  };

  const handleDeleteTrip = () => {
    if (!editingTripId) {
      setCurrentScreen('TRIP_LIST');
      return;
    }
    setTrips((prev) => prev.filter((trip) => trip.id !== editingTripId));
    setEditingTripId(null);
    setCurrentScreen('TRIP_LIST');
  };

  const handleSaveGuide = (mode: GuideFormMode, data: Omit<Guide, 'id'>) => {
    if (mode === 'create') {
      const newGuide: Guide = {
        id: Date.now().toString(),
        ...data,
      };
      setGuides((prev) => [...prev, newGuide]);
    } else if (mode === 'edit' && editingGuideId) {
      setGuides((prev) =>
        prev.map((guide) =>
          guide.id === editingGuideId ? { ...guide, ...data } : guide
        )
      );
    }
    setCurrentScreen('GUIDE_LIST');
  };

  const handleDeleteGuide = () => {
    if (!editingGuideId) {
      setCurrentScreen('GUIDE_LIST');
      return;
    }
    setGuides((prev) => prev.filter((guide) => guide.id !== editingGuideId));
    setEditingGuideId(null);
    setCurrentScreen('GUIDE_LIST');
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

