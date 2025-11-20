import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, TextInput, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface Destination {
  latitude: number;
  longitude: number;
}

export default function Home() {

  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [region, setRegion] = useState<Region | null>(null);

  const [destination, setDestination] = useState<string>("");
  const [destinationCoords, setDestinationCoords] = useState<Destination | null>(null);

  useEffect(() => {
    (async () => {
      // Ask for permission to access location
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission denied');
        return;
      }

      // Get user's current position
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      setRegion({
        latitude: location.coords.latitude,
        longitude: location .coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  // Search destination
  const searchDestination = async () => {
    if(!destination) return;

    const results = await Location.geocodeAsync(destination);

    if (results.length > 0) {
      const { latitude, longitude } = results[0];

      setDestinationCoords({ latitude, longitude });

      // Center map roughly between two points
      setRegion({
        latitude: (location!.coords.latitude + latitude) / 2,
        longitude: (location!.coords.longitude + longitude) / 2,
        latitudeDelta: Math.abs(location!.coords.latitude - latitude) * 3,
        longitudeDelta: Math.abs(location!.coords.longitude - longitude) * 3,
      });
    }

    setDestination("");
  }

  if (!region) {
    return ( 
      <SafeAreaView style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      {/* Destination search bar */}
      <View
        style={styles.searchContainer}
      >
        <TextInput 
          style={styles.searchInput}
          placeholder="Search destination..."
          placeholderTextColor="#aaa"
          value={destination}
          onChangeText={setDestination}
          onSubmitEditing={searchDestination}
          returnKeyType='search'
        />
      </View>

      <MapView 
        style={styles.map} 
        region={region}
        onRegionChangeComplete={setRegion}
      >
        {/* User marker */}
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          />
        )} 

        {/* Destination marker */}
        {destinationCoords && (
          <Marker
            coordinate={{
              latitude: destinationCoords.latitude,
              longitude: destinationCoords.longitude,
            }}
            pinColor="blue"
          />
        )}

      </MapView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  searchContainer: {
    position: 'absolute',
    zIndex: 10,
    top: 15,
    left: 15,
    right: 15,
    marginTop: 30,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingLeft: 8,
    paddingVertical: 3,
    elevation: 5,
  },
  searchInput: {
    fontSize: 16,
    color: '#000',
  },
  map: {
    width: '100%',
    height: '100%',
  }
})