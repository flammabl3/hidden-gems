import { useNavigation } from 'expo-router';
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { ExtendedTheme, useTheme } from "@react-navigation/native";

export default function PlacePage({ route }: { route: any }) {
  const { item } = route.params;
  const navigation = useNavigation();
  const { colors } = useTheme() as ExtendedTheme;

  const openInMaps = () => {
    if (item.address) {
      const address = item.address.split(' ').join('+');
      const url = `https://www.google.com/maps?q=${address}`;
      Linking.openURL(url).catch((err) =>
        console.error("Failed to open maps app:", err)
      );
    } else if (item.location) {
      const { latitude, longitude } = item.location;
      const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
      Linking.openURL(url).catch((err) =>
        console.error("Failed to open maps app:", err)
      );
    } else {
      console.error("No coordinates or address to open.");
    }
  };

  const openPlaceLink = () => {
    if (item.place_link) {
      Linking.openURL(item.place_link).catch((err) =>
        console.error("Failed to open link:", err)
      );
    } else {
      console.warn("No link available for this place.");
    }
  };

  const styles = useMemo(
    () =>
    StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        margin: 20,
        borderRadius: 20,
        backgroundColor: colors.card,
      },
      contentContainer: {
        width: "100%",
        flex: 1,
      },
      headerSection: {
        marginBottom: 10,
      },
      headerInfo: {
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'left',
        color: colors.text,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
        color: colors.secondary
      },
      descriptionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text,
      },
      descriptionText: {
        fontSize: 16,
        marginVertical: 10,
        color: colors.text,
        paddingLeft: 20
      },
      content: {
        fontSize: 16,
        textAlign: 'left',
        color: colors.text,
      },
      image: {
        width: "100%",
        height: "40%",
        borderRadius: 20,
        alignSelf: "center"
      },
      button: {
        backgroundColor: colors.primary,
        width: 110,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        padding: 5,
        marginHorizontal: 5
      },
      buttonContainer: {
        padding: 5,
        display: 'flex',
        flexDirection: "row",
      }
    }),
    [colors]
  );
  

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.headerSection}>
          <Image 
            style = {styles.image}
            source={
              item.img_url ?
              { uri: item.img_url } :
              require('../../../assets/hiddengems-logo.png') 
           }
          />
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.headerInfo}>{item.description}</Text>
          <Text style={styles.headerInfo}>{item.address ? `Address: ${item.address}` : `Coordinates: ${item.location.longitude}, ${item.location.latitude}`}</Text>
          <Text style={styles.headerInfo}>Price: {item.price > 0 ? item.price : "Free" }</Text>
        </View>
        { item.long_description && 
        <View>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{item.long_description}</Text>
        </View>
        }
      </View>
      <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}><Text style={styles.content}>Go Back</Text></TouchableOpacity>
          {item.place_link && <TouchableOpacity style={styles.button} onPress={() => openPlaceLink()}><Text style={styles.content}>Open Website</Text></TouchableOpacity>}
          <TouchableOpacity style={styles.button} onPress={() => openInMaps()}><Text style={styles.content}>Open in Maps</Text></TouchableOpacity>
        </View>
    </View>
  );
}
