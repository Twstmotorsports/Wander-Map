import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from '../styles';
import { Guide, Trip } from '../types';
import { getCountryFlag } from '../countryFlags';

export type SearchProps = {
  trips: Trip[];
  guides: Guide[];
  onBack: () => void;
  onOpenTrip: (id: string) => void;
  onOpenGuide: (id: string) => void;
};

export const SearchScreen: React.FC<SearchProps> = ({
  trips,
  guides,
  onBack,
  onOpenTrip,
  onOpenGuide,
}) => {
  const [query, setQuery] = useState('');

  const lowerQuery = query.trim().toLowerCase();
  const filteredTrips = lowerQuery
    ? trips.filter(
        (trip) =>
          trip.country.toLowerCase().includes(lowerQuery) ||
          trip.destination.toLowerCase().includes(lowerQuery) ||
          trip.activities.some((activity) =>
            activity.toLowerCase().includes(lowerQuery)
          )
      )
    : [];
  const filteredGuides = lowerQuery
    ? guides.filter(
        (guide) =>
          guide.title.toLowerCase().includes(lowerQuery) ||
          guide.location.toLowerCase().includes(lowerQuery)
      )
    : [];

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Search</Text>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        placeholder="Search destinations, activities, or guides"
      />
      {lowerQuery.length === 0 ? (
        <Text style={styles.emptyText}>
          Type to search your trips and guides.
        </Text>
      ) : (
        <ScrollView style={styles.searchResults}>
          <Text style={styles.sectionTitle}>Trips</Text>
          {filteredTrips.length === 0 ? (
            <Text style={styles.emptyText}>No matching trips.</Text>
          ) : (
            filteredTrips.map((trip) => (
              <TouchableOpacity
                key={trip.id}
                style={styles.listItem}
                onPress={() => onOpenTrip(trip.id)}
              >
                <View style={styles.countryRow}>
                  {getCountryFlag(trip.country || trip.destination) && (
                    <Text style={styles.countryFlag}>
                      {getCountryFlag(trip.country || trip.destination)}
                    </Text>
                  )}
                  <Text style={styles.countryNameText}>
                    {trip.country || 'Country'}
                  </Text>
                </View>
                <Text style={styles.listItemTitle}>{trip.destination}</Text>
                <Text style={styles.listItemSubtitle}>
                  {(trip.startDate || 'Start ?') +
                    ' - ' +
                    (trip.endDate || 'End ?')}
                </Text>
              </TouchableOpacity>
            ))
          )}
          <Text style={styles.sectionTitle}>Guides</Text>
          {filteredGuides.length === 0 ? (
            <Text style={styles.emptyText}>No matching guides.</Text>
          ) : (
            filteredGuides.map((guide) => (
              <TouchableOpacity
                key={guide.id}
                style={styles.listItem}
                onPress={() => onOpenGuide(guide.id)}
              >
                <Text style={styles.listItemTitle}>{guide.title}</Text>
                <Text style={styles.listItemSubtitle}>{guide.location}</Text>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      )}
      <TouchableOpacity style={styles.textButton} onPress={onBack}>
        <Text style={styles.textButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};
