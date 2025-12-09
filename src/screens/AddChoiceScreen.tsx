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
    <View style={styles.addChoiceRoot}>
      <View style={styles.addChoiceCard}>
        <Text style={styles.addChoiceTitle}>Add</Text>
        <Text style={styles.addChoiceSubtitle}>
          Choose what you want to plan
        </Text>
        <TouchableOpacity
          style={styles.addChoicePrimaryButton}
          onPress={onChooseTrip}
        >
          <Text style={styles.addChoicePrimaryButtonText}>Trip Plan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addChoicePrimaryButton}
          onPress={onChooseGuide}
        >
          <Text style={styles.addChoicePrimaryButtonText}>Travel Guide</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.textButton} onPress={onBack}>
          <Text style={styles.textButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
