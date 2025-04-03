import React, { forwardRef, useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { AnimatedRegion, UrlTile, Marker } from "react-native-maps";

import { Region } from "react-native-maps";

export type Place = {
  name: string;
  description?: string;
  location: {
    latitude: number;
    longitude: number;
  };
  address?: string;
  img_url?: string;
  long_description?: string;
  place_link?: string;
  price?: number;
  distance?: number;
};

type MapProps = {
  initialRegion: Region | null;
  places: Place[];
  onMarkerPress: (index: number) => void;
};

//forward ref is real weird.
const MapComponent = forwardRef<MapView, MapProps>(
  ({ initialRegion, places, onMarkerPress }, ref) => {
    // a custom map style to hide google labels.
    const mapStyle = require("../assets/json/map-style.json");

    return (
      <MapView
        ref={ref}
        initialRegion={initialRegion || undefined}
        showsUserLocation={true}
        style={styles.map}
        customMapStyle={mapStyle}
        showsPointsOfInterest={false}
      >
        <UrlTile
          urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
          flipY={false}
        />
        {places.map((item, index) => (
          <Marker
            // key should use the database id of the place... at some point.
            key={`${index}-${item.location.latitude}-${item.location.longitude}`}
            coordinate={item.location}
            pinColor={"navy"}
            onPress={() => {
              onMarkerPress(index);
            }}
          ></Marker>
        ))}
      </MapView>
    );
  }
);

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapComponent;
