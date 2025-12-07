import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles';

export type AddChoiceProps = {
  onBack: () => void;
  onChooseTrip: () => void;
  onChooseGuide: () => void;
};

export const AddChoiceScreenView: React.FC<AddChoiceProps> = ({
  onBack,
  onChooseTrip,
  onChooseGuide,
}) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Add</Text>
      <Text style={styles.subtitle}>Choose what you want to plan</Text>
      <TouchableOpacity style={styles.primaryButton} onPress={onChooseTrip}>
        <Text style={styles.primaryButtonText}>Trip Plan</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.primaryButton} onPress={onChooseGuide}>
        <Text style={styles.primaryButtonText}>Travel Guide</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.textButton} onPress={onBack}>
        <Text style={styles.textButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};
