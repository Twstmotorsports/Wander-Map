import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles';
import { Trip, TripFormMode } from '../types';
import { getCountryFlag } from '../countryFlags';

export type TripFormProps = {
  mode: TripFormMode;
  initialTrip: Trip | null;
  onSave: (mode: TripFormMode, data: Omit<Trip, 'id'>) => void;
  onCancel: () => void;
  onDelete?: () => void;
};

export const TripFormScreen: React.FC<TripFormProps> = ({
  mode,
  initialTrip,
  onSave,
  onCancel,
  onDelete,
}) => {
  const [country, setCountry] = useState(initialTrip?.country ?? '');
  const [destination, setDestination] = useState(initialTrip?.destination ?? '');
  const [startDate, setStartDate] = useState(initialTrip?.startDate ?? '');
  const [endDate, setEndDate] = useState(initialTrip?.endDate ?? '');
  const [activityInput, setActivityInput] = useState('');
  const [activities, setActivities] = useState<string[]>(
    initialTrip?.activities ?? []
  );

  const handleAddActivity = () => {
    const value = activityInput.trim();
    if (!value) {
      return;
    }
    setActivities((prev) => [...prev, value]);
    setActivityInput('');
  };

  const handleSave = () => {
    if (!destination.trim()) {
      return;
    }
    onSave(mode, {
      country: country.trim(),
      destination: destination.trim(),
      startDate: startDate.trim(),
      endDate: endDate.trim(),
      activities,
    });
  };

  const flag = getCountryFlag(country || destination);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.formContainer}
    >
      {flag && (
        <View style={styles.countryHero}>
          <Text style={styles.countryHeroFlag}>{flag}</Text>
        </View>
      )}
      <Text style={styles.title}>
        {mode === 'create' ? 'New Trip Plan' : 'Edit Trip Plan'}
      </Text>
      <Text style={styles.label}>Country</Text>
      <TextInput
        style={styles.input}
        value={country}
        onChangeText={setCountry}
        placeholder="Country (e.g. Japan, Philippines)"
      />
      <Text style={styles.label}>Destination</Text>
      <TextInput
        style={styles.input}
        value={destination}
        onChangeText={setDestination}
        placeholder="Where are you going?"
      />
      <Text style={styles.label}>Start Date</Text>
      <TextInput
        style={styles.input}
        value={startDate}
        onChangeText={setStartDate}
        placeholder="YYYY-MM-DD"
      />
      <Text style={styles.label}>End Date</Text>
      <TextInput
        style={styles.input}
        value={endDate}
        onChangeText={setEndDate}
        placeholder="YYYY-MM-DD"
      />
      <Text style={styles.label}>Activities / Places</Text>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.flex]}
          value={activityInput}
          onChangeText={setActivityInput}
          placeholder="Add an activity or place"
        />
        <TouchableOpacity style={styles.smallButton} onPress={handleAddActivity}>
          <Text style={styles.smallButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      {activities.length > 0 && (
        <View style={styles.chipContainer}>
          {activities.map((activity, index) => (
            <View key={index.toString()} style={styles.chip}>
              <Text style={styles.chipText}>{activity}</Text>
            </View>
          ))}
        </View>
      )}
      <TouchableOpacity style={styles.primaryButton} onPress={handleSave}>
        <Text style={styles.primaryButtonText}>Save Trip Plan</Text>
      </TouchableOpacity>
      {onDelete && (
        <TouchableOpacity style={styles.dangerButton} onPress={onDelete}>
          <Text style={styles.dangerButtonText}>Delete Trip</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.textButton} onPress={onCancel}>
        <Text style={styles.textButtonText}>Back to Trips</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
