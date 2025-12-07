import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles';

export type ProfileProps = {
  onBack: () => void;
};

export const ProfileScreen: React.FC<ProfileProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'TRIPS' | 'GUIDES' | 'JOURNALS'>(
    'TRIPS'
  );

  const displayName = 'Andrian Perdido';
  const username = '@andrian28';
  const followers = 0;
  const following = 0;

  const renderEmptyText = () => {
    if (activeTab === 'TRIPS') {
      return "You haven't planned any trips yet.";
    }
    if (activeTab === 'GUIDES') {
      return "You haven't created any guides yet.";
    }
    return "You haven't written any journals yet.";
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
              <Text style={styles.profileAvatarText}>AP</Text>
            </View>
            <View>
              <Text style={styles.profileName}>{displayName}</Text>
              <Text style={styles.profileUsername}>{username}</Text>
            </View>
          </View>
          <View style={styles.profileHeaderActions}>
            <TouchableOpacity style={styles.profileHeaderActionButton}>
              <Text style={styles.profileHeaderActionText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.profileStatsRow}>
          <View style={styles.profileStat}>
            <Text style={styles.profileStatNumber}>{followers}</Text>
            <Text style={styles.profileStatLabel}>FOLLOWERS</Text>
          </View>
          <View style={styles.profileStat}>
            <Text style={styles.profileStatNumber}>{following}</Text>
            <Text style={styles.profileStatLabel}>FOLLOWING</Text>
          </View>
        </View>
      </View>

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
        <Text style={styles.profileEmptyText}>{renderEmptyText()}</Text>
        {activeTab === 'TRIPS' && (
          <TouchableOpacity
            style={styles.profileEmptyButton}
            onPress={onBack}
          >
            <Text style={styles.profileEmptyButtonText}>
              Start planning a trip
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity style={styles.textButton} onPress={onBack}>
        <Text style={styles.textButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
