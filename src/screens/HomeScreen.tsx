import React from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  NativeSyntheticEvent,
  NativeScrollEvent,
  LayoutChangeEvent,
} from 'react-native';
import { styles } from '../styles';
import { HomeTopBar } from '../components/HomeTopBar';
import { HomePromoCard } from '../components/HomePromoCard';
import { HomeHero } from '../components/HomeHero';
import { HomeBottomNav } from '../components/HomeBottomNav';

export type HomeProps = {
  onAdd: () => void;
  onViewTrips: () => void;
  onViewGuides: () => void;
  onProfile: () => void;
  onSearch: () => void;
};

export const HomeScreenView: React.FC<HomeProps> = ({
  onAdd,
  onViewTrips,
  onViewGuides,
  onProfile,
  onSearch,
}) => {
  const [activePromoIndex, setActivePromoIndex] = React.useState(0);
  const [promoWidth, setPromoWidth] = React.useState(0);

  const handlePromoLayout = (event: LayoutChangeEvent) => {
    setPromoWidth(event.nativeEvent.layout.width);
  };

  const handlePromoScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!promoWidth) {
      return;
    }
    const index = Math.round(
      event.nativeEvent.contentOffset.x / promoWidth
    );
    if (index !== activePromoIndex) {
      setActivePromoIndex(index);
    }
  };

  const promoItems = [
    {
      id: 'deals',
      badgeText: 'NEW FEATURE',
      title: 'Save money on your trip',
      description: 'Find exclusive travel deals for hotels and rental cars.',
      buttonText: 'Check out deals tab',
      emoji: '💸',
    },
    {
      id: 'organize',
      badgeText: 'TRIPS',
      title: 'Keep all your trips in one place',
      description: 'Store every itinerary, booking, and note in Wander Map.',
      buttonText: 'View your trips',
      emoji: '🧳',
    },
    {
      id: 'guides',
      badgeText: 'GUIDES',
      title: 'Build your own travel guides',
      description: 'Save favorite spots and tips for future adventures.',
      buttonText: 'Browse guides',
      emoji: '📍',
    },
  ];

  const featuredGuides = [
    {
      id: 'maldives',
      title: 'Maldives Guide',
      subtitle: 'Top guide from a Wander Map community member',
      author: 'David',
      views: '100',
      avatarEmoji: '🏝️',
      imageUrl:
        'https://images.pexels.com/photos/1456291/pexels-photo-1456291.jpeg?auto=compress&cs=tinysrgb&w=1200',
    },
    {
      id: 'hokkaido',
      title: 'Hidden Hokkaido',
      subtitle: 'Local guide to uncovering Hokkaido',
      author: 'Shane',
      views: '350',
      avatarEmoji: '🗻',
      imageUrl:
        'https://images.pexels.com/photos/573552/pexels-photo-573552.jpeg?auto=compress&cs=tinysrgb&w=1200',
    },
  ];

  const weekendTrips = [
    {
      id: 'davao',
      title: 'Davao City',
      imageUrl:
        'https://images.pexels.com/photos/7223464/pexels-photo-7223464.jpeg?auto=compress&cs=tinysrgb&w=1200',
    },
  ];

  const popularDestinations = [
    { id: 'tokyo', label: 'Tokyo' },
    { id: 'cebu', label: 'Cebu' },
    { id: 'bali', label: 'Bali' },
    { id: 'bangkok', label: 'Bangkok' },
  ];

  return (
    <View style={styles.homeRoot}>
      <HomeTopBar
        title="Wander Map"
        proLabel="PRO"
        onSearch={onSearch}
        onProfile={onProfile}
      />
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.homeScrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View onLayout={handlePromoLayout}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handlePromoScroll}
            scrollEventThrottle={16}
          >
            {promoItems.map((promo, index) => (
              <View
                key={promo.id}
                style={{ width: promoWidth || undefined }}
              >
                <HomePromoCard
                  badgeText={promo.badgeText}
                  title={promo.title}
                  description={promo.description}
                  buttonText={promo.buttonText}
                  emoji={promo.emoji}
                  onViewTrips={onViewTrips}
                />
              </View>
            ))}
          </ScrollView>
          <View style={styles.homePagerDots}>
            {promoItems.map((promo, index) => (
              <View
                key={promo.id}
                style={[
                  styles.homePagerDot,
                  index === activePromoIndex && styles.homePagerDotActive,
                ]}
              />
            ))}
          </View>
        </View>
        <HomeHero
          title="Plan your next adventure"
          subtitle="Build trip plans, organize guides, and keep everything in one place."
          buttonText="Create new trip plan"
          imageUrl="https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=1200"
          onAdd={onAdd}
        />

        <View style={styles.homeSection}>
          <Text style={styles.homeSectionTitle}>Featured guides from users</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.homeSectionHorizontal}
          >
            {featuredGuides.map((guide) => (
              <View key={guide.id} style={styles.homeGuideCard}>
                <Image
                  source={{ uri: guide.imageUrl }}
                  style={styles.homeGuideImage}
                />
                <View style={styles.homeGuideMeta}>
                  <Text style={styles.homeGuideTitle}>{guide.title}</Text>
                  <Text style={styles.homeGuideSubtitle}>{guide.subtitle}</Text>
                  <View style={styles.homeGuideAuthorRow}>
                    <View style={styles.homeGuideAuthorAvatar}>
                      <Text style={styles.homeGuideAuthorAvatarText}>
                        {guide.avatarEmoji}
                      </Text>
                    </View>
                    <Text style={styles.homeGuideAuthorText}>
                      {guide.author} · {guide.views} views
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.homeSection}>
          <Text style={styles.homeSectionTitle}>Weekend trips</Text>
          <View style={styles.homeWeekendRow}>
            {weekendTrips.map((trip) => (
              <View key={trip.id} style={styles.homeWeekendCard}>
                <Image
                  source={{ uri: trip.imageUrl }}
                  style={styles.homeWeekendImage}
                />
                <View style={styles.homeWeekendMeta}>
                  <Text style={styles.homeWeekendTitle}>{trip.title}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.homeSection}>
          <Text style={styles.homeSectionTitle}>Popular destinations</Text>
          <View style={styles.homePopularRow}>
            {popularDestinations.map((dest) => (
              <View key={dest.id} style={styles.homePopularChip}>
                <Text style={styles.homePopularChipText}>{dest.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <HomeBottomNav
        onAdd={onAdd}
        onViewGuides={onViewGuides}
        onSearch={onSearch}
        onProfile={onProfile}
      />
    </View>
  );
};
