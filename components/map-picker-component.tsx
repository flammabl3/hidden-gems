import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, } from 'react-native';
import MapView, { AnimatedRegion, UrlTile, Marker,  } from 'react-native-maps';


import * as Location from 'expo-location';
import { Region } from 'react-native-maps';
import supabase from '../database/supabase';


type MapProps = {
  initialRegion: Region | null;
};

const MapPickerComponent = ({ initialRegion }: MapProps) => {

  // a custom map style to hide google labels.
  const mapStyle = require('../assets/json/map-style.json');

  const [placesRetrieved, setPlacesRetrieved ]= useState(0);


  return (
    <MapView
      initialRegion={initialRegion || undefined}
      style={styles.map}
      customMapStyle={mapStyle}
      showsPointsOfInterest={false}
    >
      <UrlTile
        urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        maximumZ={19}
        flipY={false}
      />
      
    </MapView>
  );
}

const styles = StyleSheet.create({
      map: {
        ...StyleSheet.absoluteFillObject,
      }
});

export default MapPickerComponent;