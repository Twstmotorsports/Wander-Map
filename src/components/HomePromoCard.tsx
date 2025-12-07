import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles';

export type HomePromoCardProps = {
  badgeText: string;
  title: string;
  description: string;
  buttonText: string;
  emoji: string;
  onViewTrips: () => void;
};

export const HomePromoCard: React.FC<HomePromoCardProps> = ({
  badgeText,
  title,
  description,
  buttonText,
  emoji,
  onViewTrips,
}) => {
  return (
    <View style={styles.homePromoCard}>
      <View style={styles.homePromoContent}>
        <Text style={styles.homePromoBadge}>{badgeText}</Text>
        <Text style={styles.homePromoTitle}>{title}</Text>
        <Text style={styles.homePromoText}>{description}</Text>
        <TouchableOpacity
          style={styles.homePromoButton}
          onPress={onViewTrips}
        >
          <Text style={styles.homePromoButtonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.homePromoIllustration}>
        <Text style={styles.homePromoEmoji}>{emoji}</Text>
      </View>
    </View>
  );
};
