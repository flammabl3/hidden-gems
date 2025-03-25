import MapComponent from "../../../components/map-component";
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';

import * as Location from 'expo-location';
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../database/auth-context";
import MapView from "react-native-maps";



type Place = {
    name: string,
    description?: string,
    location: {
      latitude: number,
      longitude: number,
    },
    address?: string,
    image?: string,
}

export default function Explore() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const { getUserInfo } = useAuth();
    const [userInfo, setUserInfo] = useState<{ first_name: string; last_name: string } | null>(null);
    const [places, setPlaces] = useState<Place[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const [focusedLocation, setFocusedLocation] = useState<{
        latitude: number;
        longitude: number;
        latitudeDelta: number;
        longitudeDelta: number;
      } | null>(null);

    const flatListRef = useRef<FlatList>(null);
    const mapRef = useRef<MapView>(null);


    useEffect(() => {
        const initialize = async () => {
            // Get user location
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
            }

            const location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            const userRegion = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.06,
                longitudeDelta: 0.06,
              };
              setFocusedLocation(userRegion);

            mapRef.current?.animateToRegion(userRegion, 1000);

            const { success, data } = await getUserInfo();
            if (success && data) setUserInfo(data);
        };
    
        initialize();
      }, []);
    

    const handlePlacePress = (place: Place, index: number) => {
        // Scroll FlatList to the selected item
        handleMarkerPress(index);
        
        // Animate map to the selected location
        mapRef.current?.animateToRegion({
          latitude: place.location.latitude,
          longitude: place.location.longitude,
          latitudeDelta: 0.06,
          longitudeDelta: 0.06,
        });
    };

    const handleMarkerPress = (index: number) => {
        flatListRef.current?.scrollToIndex({ index, animated: true });
        setSelectedIndex(index);
    };

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.topText}>Hello, {userInfo?.first_name}</Text>
            {errorMsg && <Text>{errorMsg}</Text>}

            <View style={styles.mapContainer}>
                <MapComponent 
                ref={mapRef}
                initialRegion={focusedLocation}
                places={places}
                setPlaces={setPlaces}
                onMarkerPress={handleMarkerPress}
                />
            </View>
            <FlatList
            ref={flatListRef}
            contentContainerStyle={styles.list}
            data={places}
            renderItem={({item, index})=>{return(
                <TouchableOpacity style={[styles.listItem, index == selectedIndex && styles.listItemHighlight]} onPress={() => handlePlacePress(item, index)}>
                    <Text> {item.name} </Text>
                    {item.description && <Text> {item.description} </Text>}
                    <Text>{item.address ? item.address : `${item.location.latitude}, ${item.location.longitude}`}</Text>
                </TouchableOpacity>
            )}}
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    topText:{
        fontSize: 20,
        color: 'white',
        padding: 10,
    },
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#5A6B75',
    },
    mapContainer: {
        height: '50%',
        width: '90%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: 'center'
      },
      list: {
        width: '100%', 
        padding: 10,
        justifyContent: 'center', 
      },
      listItem: {
        backgroundColor: 'rgb(225, 225, 225)',
        width: '100%', 
        height: 90, 
        marginVertical: 10,
        justifyContent: 'center', 
        alignItems: 'center', 
      },
      listItemHighlight: {
        backgroundColor: 'rgb(85, 83, 193)',
      },
});