import MapComponent from "../../components/map-component";
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function Explore() {

    return(
        <SafeAreaView style={styles.container}>
        
            <Text>Explore</Text>
            <MapComponent 

            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#5A6B75',
    }
});