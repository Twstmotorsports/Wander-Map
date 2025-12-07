import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles';
import { Trip } from '../types';
import { getCountryFlag } from '../countryFlags';

export type TripListProps = {
  trips: Trip[];
  onBack: () => void;
  onSelectTrip: (id: string) => void;
};

export const TripListScreen: React.FC<TripListProps> = ({
  trips,
  onBack,
  onSelectTrip,
}) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Trip Plans</Text>
      {trips.length === 0 ? (
        <Text style={styles.emptyText}>
          No trips yet. Use the Add button on Home to create one.
        </Text>
      ) : (
        <FlatList
          data={trips}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => onSelectTrip(item.id)}
            >
              <View style={styles.countryRow}>
                {getCountryFlag(item.country || item.destination) && (
                  <Text style={styles.countryFlag}>
                    {getCountryFlag(item.country || item.destination)}
                  </Text>
                )}
                <Text style={styles.countryNameText}>
                  {item.country || 'Country'}
                </Text>
              </View>
              <Text style={styles.listItemTitle}>{item.destination}</Text>
              <Text style={styles.listItemSubtitle}>
                {(item.startDate || 'Start ?') + ' - ' + (item.endDate || 'End ?')}
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
