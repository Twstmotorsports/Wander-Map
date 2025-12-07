import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles';

export type HomeTopBarProps = {
  title: string;
  proLabel: string;
  onSearch: () => void;
  onProfile: () => void;
};

export const HomeTopBar: React.FC<HomeTopBarProps> = ({
  title,
  proLabel,
  onSearch,
  onProfile,
}) => {
  return (
    <View style={styles.homeTopBar}>
      <View style={styles.homeTopBrand}>
        <View style={styles.homeTopBrandLogo} />
        <Text style={styles.homeTopBrandText}>{title}</Text>
      </View>
      <View style={styles.homeTopActions}>
        <TouchableOpacity
          style={styles.homeTopIconButton}
          onPress={onSearch}
        >
          <Text style={styles.homeTopIconText}>🔍</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.homeTopIconButton}
          onPress={onProfile}
        >
          <Text style={styles.homeTopIconText}>⭐</Text>
          <Text style={styles.homeTopIconBadge}>{proLabel}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
