import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, } from 'react-native';
import MapView, { AnimatedRegion, UrlTile, Marker,  } from 'react-native-maps';


import * as Location from 'expo-location';
import { Region } from 'react-native-maps';
import supabase from '../database/supabase';


export type Place = {
  name: string,
  description?: string,
  location: {
    latitude: number,
    longitude: number,
  },
  address?: string,
  img_url?: string,
  long_description?: string,
  place_link?: string,
  price?: number
};

type MapProps = {
  initialRegion: Region | null;
  places: Place[];
  setPlaces: React.Dispatch<React.SetStateAction<Place[]>>;
  onMarkerPress: (index: number) => void;
};

//forward ref is real weird.
const MapComponent = forwardRef<MapView, MapProps>(({ initialRegion, places, setPlaces, 
  onMarkerPress}, ref) => {

  // a custom map style to hide google labels.
  const mapStyle = require('../assets/json/map-style.json');

  const [placesRetrieved, setPlacesRetrieved ]= useState(0);

  
  async function getPlaces() {
    // only retrieve 20 places at once!
    const { data, error } = await supabase
    .from("places")
    .select("name, address, description, long_description, place_link, coordinate_lat, coordinate_long, img_url, price")
    .range(placesRetrieved, placesRetrieved+20); 

    if (error) {
      console.error('Error fetching places:', error.message);
    }

    if (!data) {
      console.error('No places found');
    }

    // map to place and push.
    else {
      const retrievedPlaces = data.map((item) => ({
        name: item.name, 
        description: item.description,
        location: 
        {
          longitude: item.coordinate_long, 
          latitude: item.coordinate_lat
        },
        address: item.address,
        img_url: item.img_url,
        long_description: item.long_description,
        place_link: item.place_link,
        price: item.price
      }));
      setPlaces(retrievedPlaces);
      setPlacesRetrieved((prev) => prev+20);
    }
      
  }
  
  useEffect(() => {
    getPlaces();
  }, []);


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
          onPress={()=>{onMarkerPress(index)}}
        >
        </Marker>
      ))}
    </MapView>
  );
});

const styles = StyleSheet.create({
      map: {
        ...StyleSheet.absoluteFillObject,
      }
});

export default MapComponent;