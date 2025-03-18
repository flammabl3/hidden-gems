import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import MapView, { AnimatedRegion, UrlTile, Marker } from 'react-native-maps';


import * as Location from 'expo-location';
import { Region } from 'react-native-maps';


//takes the user's location as a prop.
type Map_Props = { location?: Location.LocationObject | null };

const MapComponent : React.FC<Map_Props> = ({ location }) => {
  // how markers are stored as JSON. Subject to change, obviously.
  type PointOfInterest = {
    text: string
    location: {
      latitude: number,
      longitude: number
    }
  }

  // a custom map style to hide google labels.
  const mapStyle = require('../assets/json/map-style.json');

  // the default region if we are not permitted to use location services.
  const [ mapRegion, setMapRegion ] = useState<Region>(
    {
      latitude: 37,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
  );

  // the default region if we are not permitted to use location services.
  const [ markers, setMarkers ] = useState<PointOfInterest[]>(
    require('../assets/json/pins.json')
  );
  
  
  useEffect(() => {
    if (location) {
      setMapRegion(
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0,
          longitudeDelta: 0,
        }
      )
    }
  }, [location]);


  return (
          <MapView
              region={
                mapRegion
              }
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
              {
              markers.map((item) => (
                <Marker
                  key={`${item.location.latitude}-${item.location.longitude}`}
                  coordinate={item.location}
                  pinColor={'navy'}
                  title={item.text}
                />
              ))
              }
              
          </MapView>
  );
}

const styles = StyleSheet.create({
      map: {
        ...StyleSheet.absoluteFillObject,
      },
});

export default MapComponent;