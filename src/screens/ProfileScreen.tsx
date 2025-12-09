import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Share,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { styles } from '../styles';
import { getUserProfile, updateUserProfile } from '../services/userService';
import { Trip, Guide } from '../types';

export type ProfileProps = {
  userId: string;
  onBack: () => void;
  onLogout?: () => void;
  userEmail?: string | null;
  trips: Trip[];
  guides: Guide[];
  onOpenTrip: (id: string) => void;
  onOpenGuide: (id: string) => void;
};

export const ProfileScreen: React.FC<ProfileProps> = ({
  userId,
  onBack,
  onLogout,
  userEmail,
  trips,
  guides,
  onOpenTrip,
  onOpenGuide,
}) => {
  const [activeTab, setActiveTab] = useState<'TRIPS' | 'GUIDES' | 'JOURNALS'>(
    'TRIPS'
  );

  const [displayNameInput, setDisplayNameInput] = useState('');
  const [photoUrlInput, setPhotoUrlInput] = useState('');
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isProfileSaving, setIsProfileSaving] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsProfileLoading(true);
        setProfileError(null);

        const profile = await getUserProfile(userId);
        const emailLocalPart = userEmail ? userEmail.split('@')[0] : '';
        const fallbackName = emailLocalPart
          ? emailLocalPart.charAt(0).toUpperCase() + emailLocalPart.slice(1)
          : 'Traveler';

        setDisplayNameInput(profile?.displayName ?? fallbackName);
        setPhotoUrlInput(profile?.photoURL ?? '');
      } catch (error) {
        console.error('Error loading profile:', error);
        setProfileError('Unable to load your profile.');
      } finally {
        setIsProfileLoading(false);
      }
    };

    loadProfile();
  }, [userId, userEmail]);

  const emailLabel = userEmail ?? 'No email available';
  const effectiveName = displayNameInput || 'Traveler';
  const avatarInitials =
    effectiveName
      .split(/[.\s_]/)
      .filter((part: string) => part.length > 0)
      .map((part: string) => part[0].toUpperCase())
      .slice(0, 2)
      .join('') || 'U';
  const tripCount = trips.length;
  const guideCount = guides.length;

  const handleSaveProfile = async () => {
    try {
      setProfileError(null);
      setProfileSuccess(null);
      setIsProfileSaving(true);

      await updateUserProfile(userId, {
        displayName: displayNameInput.trim() || null,
        photoURL: photoUrlInput.trim() || null,
      });

      setProfileSuccess('Profile updated.');
    } catch (error) {
      console.error('Error updating profile:', error);
      setProfileError('Unable to update your profile. Please try again.');
    } finally {
      setIsProfileSaving(false);
    }
  };

  const handlePickFromLibrary = async () => {
    try {
      setProfileError(null);
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permission.status !== 'granted') {
        setProfileError(
          'Photos permission is required to choose a profile picture.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        return;
      }

      setPhotoUrlInput(result.assets[0].uri);
    } catch (error) {
      console.error('Error picking image:', error);
      setProfileError('Unable to pick an image. Please try again.');
    }
  };

  const handleTakePhoto = async () => {
    try {
      setProfileError(null);
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (permission.status !== 'granted') {
        setProfileError(
          'Camera permission is required to take a profile picture.'
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        return;
      }

      setPhotoUrlInput(result.assets[0].uri);
    } catch (error) {
      console.error('Error taking photo:', error);
      setProfileError('Unable to take a photo. Please try again.');
    }
  };

  const handleShareProfile = async () => {
    try {
      const lines = [
        'Check out my trips and guides on Wander-Map!',
        userEmail ? `My travel email: ${userEmail}` : '',
      ].filter(Boolean);

      await Share.share({
        message: lines.join('\n'),
      });
    } catch (error) {
      console.error('Error sharing profile:', error);
    }
  };

  const renderEmptyText = () => {
    if (activeTab === 'JOURNALS') {
      return "You haven't written any journals yet.";
    }
    return '';
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.formContainer}
    >
      <View style={styles.profileHeaderCard}>
        <View style={styles.profileHeaderRow}>
          <View style={styles.profileHeaderMain}>
            <View style={styles.profileAvatar}>
              {photoUrlInput ? (
                <Image
                  source={{ uri: photoUrlInput }}
                  style={{ width: 56, height: 56, borderRadius: 999 }}
                />
              ) : (
                <Text style={styles.profileAvatarText}>{avatarInitials}</Text>
              )}
            </View>
            <View>
              <Text style={styles.profileName}>{effectiveName}</Text>
              <Text style={styles.profileUsername}>{emailLabel}</Text>
            </View>
          </View>
          <View style={styles.profileHeaderActions}>
            <TouchableOpacity
              style={styles.profileHeaderActionButton}
              onPress={handleShareProfile}
            >
              <Text style={styles.profileHeaderActionText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.profileStatsRow}>
          <View style={styles.profileStat}>
            <Text style={styles.profileStatNumber}>{tripCount}</Text>
            <Text style={styles.profileStatLabel}>TRIPS</Text>
          </View>
          <View style={styles.profileStat}>
            <Text style={styles.profileStatNumber}>{guideCount}</Text>
            <Text style={styles.profileStatLabel}>GUIDES</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.textButton}
        onPress={() => setShowSettings((prev) => !prev)}
      >
        <Text style={styles.textButtonText}>
          {showSettings ? 'Hide profile settings' : 'Profile settings'}
        </Text>
      </TouchableOpacity>

      {showSettings && (
        <>
          {profileError && (
            <Text style={styles.formErrorText}>{profileError}</Text>
          )}
          {profileSuccess && (
            <Text
              style={{
                marginTop: 8,
                fontSize: 13,
                color: '#16A34A',
              }}
            >
              {profileSuccess}
            </Text>
          )}

          <View style={{ marginTop: 12 }}>
            <Text style={styles.label}>Display name</Text>
            <TextInput
              style={styles.input}
              value={displayNameInput}
              onChangeText={setDisplayNameInput}
              placeholder="Your name"
            />
            <Text style={styles.label}>Profile photo URL</Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 8,
                marginBottom: 8,
              }}
            >
              <TouchableOpacity
                style={[
                  styles.secondaryButton,
                  { marginHorizontal: 0, marginRight: 4 },
                ]}
                onPress={handlePickFromLibrary}
              >
                <Text style={styles.secondaryButtonText}>Photos</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.secondaryButton,
                  { marginHorizontal: 0, marginLeft: 4 },
                ]}
                onPress={handleTakePhoto}
              >
                <Text style={styles.secondaryButtonText}>Camera</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              value={photoUrlInput}
              onChangeText={setPhotoUrlInput}
              placeholder="https://example.com/me.jpg"
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleSaveProfile}
              disabled={isProfileSaving}
            >
              {isProfileSaving ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.primaryButtonText}>Save profile</Text>
              )}
            </TouchableOpacity>
          </View>
        </>
      )}

      <View style={styles.profileTabsRow}>
        {[{ id: 'TRIPS' as const, label: 'Trips' }, { id: 'GUIDES' as const, label: 'Guides' }, { id: 'JOURNALS' as const, label: 'Journals' }].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={styles.profileTab}
              onPress={() => setActiveTab(tab.id)}
            >
              <Text
                style={
                  isActive
                    ? styles.profileTabLabelActive
                    : styles.profileTabLabel
                }
              >
                {tab.label}
              </Text>
              {isActive && <View style={styles.profileTabUnderline} />}
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.profileContent}>
        {activeTab === 'TRIPS' && (
          <>
            {trips.length === 0 ? (
              <>
                <Text style={styles.profileEmptyText}>
                  You haven't planned any trips yet.
                </Text>
                <TouchableOpacity
                  style={styles.profileEmptyButton}
                  onPress={onBack}
                >
                  <Text style={styles.profileEmptyButtonText}>
                    Start planning a trip
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              trips.map((trip) => (
                <TouchableOpacity
                  key={trip.id}
                  style={styles.listItem}
                  onPress={() => onOpenTrip(trip.id)}
                >
                  <Text style={styles.listItemTitle}>{trip.destination}</Text>
                  <Text style={styles.listItemSubtitle}>
                    {(trip.startDate || 'Start ?') +
                      ' - ' +
                      (trip.endDate || 'End ?')}
                  </Text>
                </TouchableOpacity>
              ))
            )}
          </>
        )}

        {activeTab === 'GUIDES' && (
          <>
            {guides.length === 0 ? (
              <Text style={styles.profileEmptyText}>
                You haven't created any guides yet.
              </Text>
            ) : (
              guides.map((guide) => (
                <TouchableOpacity
                  key={guide.id}
                  style={styles.listItem}
                  onPress={() => onOpenGuide(guide.id)}
                >
                  <Text style={styles.listItemTitle}>{guide.title}</Text>
                  <Text style={styles.listItemSubtitle}>
                    {guide.location || 'Location'}
                  </Text>
                </TouchableOpacity>
              ))
            )}
          </>
        )}

        {activeTab === 'JOURNALS' && (
          <Text style={styles.profileEmptyText}>{renderEmptyText()}</Text>
        )}
      </View>

      {onLogout && (
        <TouchableOpacity style={styles.textButton} onPress={onLogout}>
          <Text style={styles.textButtonText}>Log out</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.textButton} onPress={onBack}>
        <Text style={styles.textButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
