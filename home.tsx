// home.tsx
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
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
import { useTrips } from './src/hooks/useTrips';
import { useGuides } from './src/hooks/useGuides';
import {
  createTripForUser,
  updateTrip,
  deleteTrip,
} from './src/services/tripService';
import {
  createGuideForUser,
  updateGuide,
  deleteGuide,
} from './src/services/guideService';
import { useAppTheme } from './src/theme';

type HomeAppProps = {
  userId: string;
  userEmail?: string | null;
  onLogout?: () => void;
};

export default function HomeApp({ userId, userEmail, onLogout }: HomeAppProps) {
  const [currentScreen, setCurrentScreen] = useState<Screen>('HOME');
  const [editingTripId, setEditingTripId] = useState<string | null>(null);
  const [editingGuideId, setEditingGuideId] = useState<string | null>(null);
  const {
    trips,
    isLoading: tripsLoading,
    error: tripsError,
  } = useTrips(userId);
  const {
    guides,
    isLoading: guidesLoading,
    error: guidesError,
  } = useGuides(userId);

  const isLoading = tripsLoading || guidesLoading;
  const loadError = tripsError || guidesError;

  const theme = useAppTheme();

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

  const handleSaveTrip = async (
    mode: TripFormMode,
    data: Omit<Trip, 'id' | 'userId'>
  ) => {
    try {
      if (mode === 'create') {
        await createTripForUser(userId, data);
      } else if (mode === 'edit' && editingTripId) {
        await updateTrip(editingTripId, data);
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
      await deleteTrip(editingTripId);
      setEditingTripId(null);
      setCurrentScreen('TRIP_LIST');
    } catch (error) {
      console.error('Error deleting trip:', error);
    }
  };

  const handleSaveGuide = async (
    mode: GuideFormMode,
    data: Omit<Guide, 'id' | 'userId'>
  ) => {
    try {
      if (mode === 'create') {
        await createGuideForUser(userId, data);
      } else if (mode === 'edit' && editingGuideId) {
        await updateGuide(editingGuideId, data);
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
      await deleteGuide(editingGuideId);
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
    content = (
      <ProfileScreen
        userId={userId}
        onBack={openHome}
        onLogout={onLogout}
        userEmail={userEmail}
        trips={trips}
        guides={guides}
        onOpenTrip={openTripForEdit}
        onOpenGuide={openGuideForEdit}
      />
    );
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
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <StatusBar style={theme.statusBarStyle} />
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator color={theme.primary} />
          {loadError && (
            <Text
              style={{
                marginTop: 8,
                color: '#B91C1C',
                fontSize: 13,
                textAlign: 'center',
                paddingHorizontal: 24,
              }}
            >
              {loadError}
            </Text>
          )}
        </View>
      ) : (
        <>
          {loadError && (
            <View
              style={{
                paddingVertical: 8,
                paddingHorizontal: 16,
                backgroundColor: '#FEE2E2',
              }}
            >
              <Text
                style={{ color: '#B91C1C', fontSize: 13, textAlign: 'center' }}
              >
                {loadError}
              </Text>
            </View>
          )}
          {content}
        </>
      )}
    </SafeAreaView>
  );
}