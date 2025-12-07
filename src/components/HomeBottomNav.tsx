import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles';

export type HomeBottomNavProps = {
  onAdd: () => void;
  onViewGuides: () => void;
  onSearch: () => void;
  onProfile: () => void;
};

export const HomeBottomNav: React.FC<HomeBottomNavProps> = ({
  onAdd,
  onViewGuides,
  onSearch,
  onProfile,
}) => {
  return (
    <View style={styles.navBar}>
      <View style={[styles.navItem, styles.navItemActive]}>
        <Text style={styles.navItemIcon}>🏠</Text>
      </View>
      <TouchableOpacity style={styles.navItem} onPress={onViewGuides}>
        <Text style={styles.navItemIcon}>🛏️</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navCenterButton} onPress={onAdd}>
        <Text style={styles.navCenterIcon}>＋</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={onSearch}>
        <Text style={styles.navItemIcon}>🗺️</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={onProfile}>
        <Text style={styles.navItemIcon}>👤</Text>
      </TouchableOpacity>
    </View>
  );
};
