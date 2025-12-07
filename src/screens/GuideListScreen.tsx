import React, { useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles';
import { Guide } from '../types';

export type GuideListProps = {
  guides: Guide[];
  onBack: () => void;
  onSelectGuide: (id: string) => void;
};

export const GuideListScreen: React.FC<GuideListProps> = ({
  guides,
  onBack,
  onSelectGuide,
}) => {
  const [where, setWhere] = useState('');
  const [when, setWhen] = useState('');
  const [travelers, setTravelers] = useState('');
	const [recentSearch, setRecentSearch] = useState<
		{ place: string; meta: string } | null
	>({
		place: 'Tokyo, Tokyo Prefecture, Japan',
		meta: 'Nov 22 — Nov 23 · 2 guests · 1 room',
	});

	const handleSearch = () => {
		const trimmedWhere = where.trim() || 'Tokyo, Tokyo Prefecture, Japan';
		const trimmedWhen = when.trim() || 'Nov 22 — Nov 23';
		const trimmedTrav = travelers.trim() || '2 guests · 1 room';
		const meta = `${trimmedWhen} · ${trimmedTrav}`;

		setRecentSearch({ place: trimmedWhere, meta });
		console.log('Book hotels search', { where, when, travelers });
	};

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Travel Guides</Text>

      <View style={styles.guidesBookContainer}>
        <Text style={styles.guidesBookTitle}>Book hotels</Text>

        <View style={styles.guidesBookInputLarge}>
          <Text style={styles.guidesBookInputLabel}>Where</Text>
          <TextInput
            style={styles.guidesBookInputPlaceholder}
            value={where}
            onChangeText={setWhere}
            placeholder="City you're visiting"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View style={styles.guidesBookRow}>
          <View style={styles.guidesBookInputSmall}>
            <Text style={styles.guidesBookInputLabel}>When</Text>
            <TextInput
              style={styles.guidesBookInputValue}
              value={when}
              onChangeText={setWhen}
              placeholder="12/22 - 12/23"
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <View style={styles.guidesBookInputSmall}>
            <Text style={styles.guidesBookInputLabel}>Travelers</Text>
            <TextInput
              style={styles.guidesBookInputValue}
              value={travelers}
              onChangeText={setTravelers}
              placeholder="2 guests · 1 room"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.guidesBookSearchButton}
          onPress={handleSearch}
        >
          <Text style={styles.guidesBookSearchButtonText}>Search</Text>
        </TouchableOpacity>

        <View style={styles.guidesBookRecentSection}>
          <Text style={styles.guidesBookRecentTitle}>Recently searched</Text>
          <View style={styles.guidesBookRecentItem}>
            <View style={styles.guidesBookRecentIcon}>
              <Text style={styles.guidesBookRecentIconText}>🏨</Text>
            </View>
            <View style={styles.guidesBookRecentTexts}>
              <Text style={styles.guidesBookRecentPlace}>
                {recentSearch?.place}
              </Text>
              <Text style={styles.guidesBookRecentMeta}>
                {recentSearch?.meta}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {guides.length === 0 ? (
        <Text style={styles.emptyText}>
          No guides yet. Use the Add button on Home to create one.
        </Text>
      ) : (
        <FlatList
          data={guides}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => onSelectGuide(item.id)}
            >
              <Text style={styles.listItemTitle}>{item.title}</Text>
              <Text style={styles.listItemSubtitle}>
                {item.location || 'Location'}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
      <TouchableOpacity style={styles.textButton} onPress={onBack}>
        <Text style={styles.textButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};
