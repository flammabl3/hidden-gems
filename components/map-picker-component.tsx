import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { UrlTile, Marker, Region } from 'react-native-maps';
import supabase from '../database/supabase';

type MapProps = {
  initialRegion: Region | null;
  onMarkerPlace: (coords: { latitude: number; longitude: number }) => void;
};

const MapPickerComponent = ({ initialRegion, onMarkerPlace }: MapProps) => {
  const mapStyle = require('../assets/json/map-style.json');
  const [selectedCoords, setSelectedCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const handleMapPress = (e: any) => {
    const { coordinate } = e.nativeEvent;
    setSelectedCoords(coordinate);
    onMarkerPlace(coordinate);
  };

  return (
    <MapView
      initialRegion={initialRegion || undefined}
      style={styles.map}
      customMapStyle={mapStyle}
      showsPointsOfInterest={false}
      onPress={handleMapPress}
    >
      <UrlTile
        urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        maximumZ={19}
        flipY={false}
      />
      {selectedCoords && (
        <Marker
          coordinate={selectedCoords}
          draggable
          pinColor={"navy"}
          onDragEnd={(e) => {
            const newCoords = e.nativeEvent.coordinate;
            setSelectedCoords(newCoords);
            onMarkerPlace(newCoords);
          }}
        />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapPickerComponent;