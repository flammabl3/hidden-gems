import MapComponent from "../../../components/map-component";
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

import * as Location from 'expo-location';
import { useEffect, useState } from "react";


export default function Explore() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    
    useEffect(() => {
        async function getCurrentLocation() {
            
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        }

        getCurrentLocation();
    }, []);
    

    return(
        <SafeAreaView style={styles.container}>
            
            <Text>Explore</Text>
            {errorMsg && <Text>{errorMsg}</Text>}

            <View style={styles.mapContainer}>
                <MapComponent 
                    location={location}
                />
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
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
});