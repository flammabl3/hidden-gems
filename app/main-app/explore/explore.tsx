import MapComponent, { Place } from "../../../components/map-component";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { ExtendedTheme, useTheme } from "@react-navigation/native";
import * as Location from "expo-location";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "../../../database/auth-context";
import MapView from "react-native-maps";
import { useTranslation } from "react-i18next";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { hide } from "expo-router/build/utils/splash";
import { useLocation } from "../../../components/location-context";
import supabase from "../../../database/supabase";

export default function Explore() {
  const { colors } = useTheme() as ExtendedTheme;
  const { t } = useTranslation();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { getUserInfo } = useAuth();
  const [userInfo, setUserInfo] = useState<{
    first_name: string;
    last_name: string;
  } | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  type RootStackParamList = {
    Explore: undefined;
    PlacePage: { item: Place };
  };

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [focusedLocation, setFocusedLocation] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);

  const flatListRef = useRef<FlatList>(null);
  const mapRef = useRef<MapView>(null);

  const { location, error } = useLocation();
  useEffect(() => {
    const initialize = async () => {
      //location comes from our context
      if (location) {
        const userRegion = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.06,
          longitudeDelta: 0.06,
        };
        setFocusedLocation(userRegion);

        mapRef.current?.animateToRegion(userRegion, 1000);
      }

      if (error) {
        setErrorMsg(error);
      }

      let { error: errorInfo, success, data } = await getUserInfo();
      if (success && data) setUserInfo(data);
      else if (errorInfo) setErrorMsg(errorInfo);
    };

    initialize();
  }, [location, error]);

  const handlePlacePress = (place: Place, index: number) => {
    // Scroll FlatList to the selected item
    handleMarkerPress(index);
    setSelectedIndex(-1);
    // Animate map to the selected location
    mapRef.current?.animateToRegion({
      latitude: place.location.latitude,
      longitude: place.location.longitude,
      latitudeDelta: 0.06,
      longitudeDelta: 0.06,
    });

    navigation.navigate("PlacePage", { item: place });
  };

  const handleMarkerPress = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
    setSelectedIndex(index);
  };

  const getLimit = 10;

  const [placesRetrieved, setPlacesRetrieved] = useState(0);

  async function getPlaces() {
    // only retrieve getLimit places at once!
    const { data, error } = await supabase
      .from("places")
      .select(
        "name, address, description, long_description, place_link, coordinate_lat, coordinate_long, img_url, price"
      )
      .range(placesRetrieved, placesRetrieved + getLimit);

    if (error) {
      console.error("Error fetching places:", error.message);
    }

    if (!data) {
      console.error("No places found");
    }

    // map to place and push.
    else {
      const retrievedPlaces = data.map((item) => ({
        name: item.name,
        description: item.description,
        location: {
          longitude: item.coordinate_long,
          latitude: item.coordinate_lat,
        },
        address: item.address,
        img_url: item.img_url,
        long_description: item.long_description,
        place_link: item.place_link,
        price: item.price,
      }));
      setPlaces(places.concat(retrievedPlaces));
      setPlacesRetrieved((prev) => prev + getLimit + 1);
    }
  }

  const styles = useMemo(
    () =>
      StyleSheet.create({
        topText: {
          fontSize: 20,
          color: colors.text,
          padding: 10,
        },
        container: {
          height: "100%",
          width: "100%",
          backgroundColor: colors.background,
        },
        mapContainer: {
          height: "50%",
          width: "90%",
          justifyContent: "flex-end",
          alignItems: "center",
          alignSelf: "center",
        },
        list: {
          width: "100%",
          padding: 10,
          justifyContent: "center",
        },
        listItem: {
          backgroundColor: colors.card,
          width: "100%",
          height: 200,
          marginVertical: 10,
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
          borderRadius: 20,
          overflow: "hidden",
        },
        listItemSelected: {
          backgroundColor: colors.border,
        },
        listText: {
          color: colors.text,
          marginVertical: 5,
          fontSize: 15,
          width: "33%",
        },
        listTextContainer: {
          color: colors.text,
          display: "flex",
          flexGrow: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
          width: "100%",
        },
        listImage: {
          width: "100%",
          height: "70%",
        },
      }),
    [colors]
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.topText}>
        {t("helloUser", { name: userInfo?.first_name || "" })}
      </Text>
      {errorMsg && <Text>{errorMsg}</Text>}

      <View style={styles.mapContainer}>
        <MapComponent
          ref={mapRef}
          initialRegion={focusedLocation}
          places={places}
          onMarkerPress={handleMarkerPress}
        />
      </View>
      <FlatList
        ref={flatListRef}
        contentContainerStyle={styles.list}
        data={places}
        extraData={selectedIndex} // rerender on more data
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={[
                styles.listItem,
                index == selectedIndex && styles.listItemSelected,
              ]}
              onPress={() => handlePlacePress(item, index)}
            >
              <Image
                style={styles.listImage}
                source={
                  item.img_url
                    ? { uri: item.img_url }
                    : require("../../../assets/hiddengems-logo.png")
                }
              />
              <View style={styles.listTextContainer}>
                <Text style={styles.listText}> {item.name} </Text>
                <Text style={styles.listText}>
                  {" "}
                  {item.price > 0 ? item.price : "Free"}{" "}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        onEndReached={getPlaces}
        onEndReachedThreshold={0.8}
      />
    </SafeAreaView>
  );
}
