import { 
  StyleSheet, View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Image, ScrollView, 
  Keyboard,
  KeyboardAvoidingViewBase,
  Modal
} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useMemo } from "react";
import { useNavigation, useRouter } from "expo-router";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { ExtendedTheme, NavigationProp, useTheme } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import { useLocation } from "../../../components/location-context";

type coordinate =
{
  longitude: number | null,
  latitude: number | null,
};


export default function UploadForm() {
  const router = useRouter();
  const { t } = useTranslation();
  const { colors } = useTheme() as ExtendedTheme;

  const [locationName, setLocationName] = useState('');
  const [coordinates, setCoordinates] = useState<coordinate>({longitude: null, latitude: null});
  const [locationAddress, setLocationAddress] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState<{ uri: string } | null>(null);

  const [showModal, setShowModal] = useState<boolean>(false);

  const { location, error } = useLocation();

  type RootStackParamList = {
    Explore: undefined;
    UploadPreviewScreen: { params: {
      name: string,
      address: string | undefined,
      coordinates: coordinate,
      description: string,
      place_link: string,
      image_uri: string | undefined,
    }};
  };
  
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const styles = useMemo(() =>
    StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.background,
        paddingHorizontal: '5%',
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: colors.text,
        backgroundColor: colors.background,
        color: colors.text,
        paddingHorizontal: '5%',
        width: '100%',
        height: 55,
        marginVertical: 12,
      },
      input: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 10,
        color: colors.text,
      },
      dropArea: {
        height: 150,
        backgroundColor: colors.card,
        borderWidth: 2,
        borderColor: colors.border,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        overflow: 'hidden',
      },
      dropText: {
        color: colors.text,
      },
      multilineInput: {
        height: 100,
        textAlignVertical: 'top',
      },
      nextButton: {
        backgroundColor: colors.primary,
        paddingVertical: '4%',
        borderRadius: 8,
        alignItems: "center",
        width: '50%',
        alignSelf: 'center',
        marginTop: '10%',
      },
      nextText: {
        color: colors.text,
        fontSize: 18,
        fontWeight: "bold",
      }
    }), [colors]
  );

  const showMapModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}>
        <View >
          <View >
            <Text>Hello World!</Text>
            <TouchableOpacity
              onPress={() => setShowModal(false)}>
              <Text>Hide Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <SafeAreaView style={styles.container} edges={["top"]}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            {/* Location Name */}
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons
                name="map-marker-outline"
                size={24}
                color={colors.text}
              />
              <TextInput
                style={styles.input}
                placeholder="Location Name"
                placeholderTextColor={colors.text}
                value={locationName}
                onChangeText={setLocationName}
              />
            </View>

            {/* coordinates */}
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons
                name="map-marker-outline"
                size={24}
                color={colors.text}
              />
              <TextInput
                style={styles.input}
                placeholder="Longitude"
                placeholderTextColor={colors.text}
                value={coordinates?.longitude?.toString()}
                onChangeText={(value) =>
                  setCoordinates((prev) => ({
                    ...prev,
                    longitude: parseFloat(value) || null,
                    latitude: prev?.latitude || null,
                  }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Latitude"
                placeholderTextColor={colors.text}
                value={coordinates?.latitude?.toString()}
                onChangeText={(value) =>
                  setCoordinates((prev) => ({
                    ...prev,
                    longitude: prev?.longitude || 0,
                    latitude: parseFloat(value) || 0,
                  }))
                }
              />
              <TouchableOpacity
                onPress={() =>
                  setCoordinates({
                    longitude: location?.coords.longitude || null,
                    latitude: location?.coords.latitude || null,
                  })
                }
              >
                <Text>Use Current Location</Text>
              </TouchableOpacity>
            </View>

            {/* Location Address */}
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons
                name="map-outline"
                size={24}
                color={colors.text}
              />
              <TextInput
                style={styles.input}
                placeholder="Location Address"
                placeholderTextColor={colors.text}
                value={locationAddress}
                onChangeText={setLocationAddress}
              />
            </View>

            {/* Drop Area */}
            <TouchableOpacity style={styles.dropArea} onPress={pickImage}>
              {image ? (
                <Image
                  source={{ uri: image.uri }}
                  style={{ width: "100%", height: "100%", borderRadius: 10 }}
                />
              ) : (
                <>
                  <MaterialCommunityIcons
                    name="image-outline"
                    size={32}
                    color={colors.text}
                    style={{ marginBottom: 8 }}
                  />
                  <Text style={styles.dropText}>Tap to select an image</Text>
                </>
              )}
            </TouchableOpacity>

            {/* Description */}
            <View
              style={[
                styles.inputContainer,
                {
                  height: 120,
                  alignItems: "flex-start",
                  paddingTop: 10,
                  borderWidth: 2,
                },
              ]}
            >
              <MaterialCommunityIcons
                name="text-box-outline"
                size={22}
                color={colors.text}
                style={{ marginTop: 5 }}
              />
              <TextInput
                style={[
                  styles.input,
                  styles.multilineInput,
                  { textDecorationLine: "underline" },
                ]}
                placeholder="Description"
                placeholderTextColor={colors.text}
                multiline
                value={description}
                onChangeText={setDescription}
              />
            </View>

            {/* Link */}
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons
                name="link-variant"
                size={24}
                color={colors.text}
              />
              <TextInput
                style={styles.input}
                placeholder="Reference Link"
                placeholderTextColor={colors.text}
                autoCapitalize="none"
                value={link}
                onChangeText={setLink}
              />
            </View>

            {/* Next Button */}
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => {
                navigation.navigate("UploadPreviewScreen", {
                  params: {
                    name: locationName,
                    address: locationAddress,
                    coordinates: coordinates,
                    description: description,
                    place_link: link,
                    image_uri: image?.uri,
                  },
                });
              }}
            >
              <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}
