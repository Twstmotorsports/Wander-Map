import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
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
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [hotelWhere, setHotelWhere] = useState('');
  const [hotelWhen, setHotelWhen] = useState('');
  const [hotelTravelers, setHotelTravelers] = useState('');
  const [routeSummary, setRouteSummary] = useState<string | null>(null);
  const [hotelSummary, setHotelSummary] = useState<string | null>(null);
  const [mapRegion, setMapRegion] = useState<Region>({
    latitude: 7.0731,
    longitude: 125.6128,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

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

  const handleShowRoute = () => {
    const fromLabel = from.trim() || 'Your location';
    const toLabel = to.trim() || 'Destination';
    setRouteSummary(
      `route: ${fromLabel} → ${toLabel} · 25 min drive (sample)`
    );
  };

  const handleSearchHotels = () => {
    const whereLabel = hotelWhere.trim() || 'Tokyo, Japan';
    const whenLabel = hotelWhen.trim() || 'Nov 22 — Nov 24';
    const travLabel = hotelTravelers.trim() || '2 guests · 1 room';
    setHotelSummary(`${whereLabel} · ${whenLabel} · ${travLabel}`);
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Explore & Search</Text>

        <Text style={styles.sectionTitle}>Map</Text>
        <View
          style={{
            borderRadius: 16,
            overflow: 'hidden',
            backgroundColor: '#E5E7EB',
            marginBottom: 12,
            height: 220,
          }}
        >
          <MapView
            style={{ flex: 1 }}
            region={mapRegion}
            onRegionChangeComplete={setMapRegion}
          >
            <Marker
              coordinate={{
                latitude: mapRegion.latitude,
                longitude: mapRegion.longitude,
              }}
              title="Explore here"
              description="Pan and zoom the map to look around."
            />
          </MapView>
        </View>
        <Text style={styles.emptyText}>
          This is a real map view. Pan/zoom to explore nearby areas.
        </Text>

        <Text style={styles.label}>From</Text>
        <TextInput
          style={styles.input}
          value={from}
          onChangeText={setFrom}
          placeholder="Your location"
        />
        <Text style={styles.label}>To</Text>
        <TextInput
          style={styles.input}
          value={to}
          onChangeText={setTo}
          placeholder="Place you want to go"
        />
        <TouchableOpacity style={styles.primaryButton} onPress={handleShowRoute}>
          <Text style={styles.primaryButtonText}>Show route </Text>
        </TouchableOpacity>
        {routeSummary && (
          <Text style={styles.emptyText}>{routeSummary}</Text>
        )}

        <View style={{ marginTop: 24 }}>
          <Text style={styles.sectionTitle}>Book hotels </Text>
          <View style={styles.guidesBookInputLarge}>
            <Text style={styles.guidesBookInputLabel}>Where</Text>
            <TextInput
              style={styles.guidesBookInputPlaceholder}
              value={hotelWhere}
              onChangeText={setHotelWhere}
              placeholder="City you're visiting"
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <View style={styles.guidesBookRow}>
            <View style={styles.guidesBookInputSmall}>
              <Text style={styles.guidesBookInputLabel}>When</Text>
              <TextInput
                style={styles.guidesBookInputValue}
                value={hotelWhen}
                onChangeText={setHotelWhen}
                placeholder="12/22 - 12/23"
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <View style={styles.guidesBookInputSmall}>
              <Text style={styles.guidesBookInputLabel}>Travelers</Text>
              <TextInput
                style={styles.guidesBookInputValue}
                value={hotelTravelers}
                onChangeText={setHotelTravelers}
                placeholder="2 guests · 1 room"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.guidesBookSearchButton}
            onPress={handleSearchHotels}
          >
            <Text style={styles.guidesBookSearchButtonText}>
              Search hotels
            </Text>
          </TouchableOpacity>
          {hotelSummary && (
            <View style={styles.listItem}>
              <Text style={styles.listItemTitle}>
                Sample hotel near {hotelSummary.split('·')[0].trim()}
              </Text>
              <Text style={styles.listItemSubtitle}>{hotelSummary}</Text>
              <Text style={styles.listItemSubtitle}>
                ₱3,500 / night · 4.5 ★ rating (mock)
              </Text>
            </View>
          )}
        </View>

        <View style={{ marginTop: 24 }}>
          <Text style={styles.sectionTitle}>Search your trips & guides</Text>
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
            <View style={styles.searchResults}>
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
                    <Text style={styles.listItemTitle}>
                      {trip.destination}
                    </Text>
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
                    <Text style={styles.listItemSubtitle}>
                      {guide.location}
                    </Text>
                  </TouchableOpacity>
                ))
              )}
            </View>
          )}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.textButton} onPress={onBack}>
        <Text style={styles.textButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};
