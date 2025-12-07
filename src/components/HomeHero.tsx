import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { styles } from '../styles';

export type HomeHeroProps = {
  title: string;
  subtitle: string;
  buttonText: string;
  imageUrl: string;
  onAdd: () => void;
};

export const HomeHero: React.FC<HomeHeroProps> = ({
  title,
  subtitle,
  buttonText,
  imageUrl,
  onAdd,
}) => {
  return (
    <ImageBackground
      source={{ uri: imageUrl }}
      style={styles.homeHero}
      imageStyle={styles.homeHeroImage}
    >
      <View style={styles.homeHeroOverlay}>
        <Text style={styles.homeHeroTitle}>{title}</Text>
        <Text style={styles.homeHeroSubtitle}>{subtitle}</Text>
        <TouchableOpacity style={styles.homeHeroButton} onPress={onAdd}>
          <Text style={styles.homeHeroButtonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
