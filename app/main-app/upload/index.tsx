import { 
    StyleSheet, View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Image, ScrollView 
  } from "react-native";
  import { MaterialCommunityIcons } from '@expo/vector-icons';
  import { useState, useMemo } from "react";
  import { useRouter } from "expo-router";
  import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
  import { useTranslation } from 'react-i18next';
  import { ExtendedTheme, useTheme } from "@react-navigation/native";
  import * as ImagePicker from 'expo-image-picker';
  
  export default function Upload() {
    const router = useRouter();
    const { t } = useTranslation();
    const { colors } = useTheme() as ExtendedTheme;
  
    const [locationName, setLocationName] = useState('');
    const [locationAddress, setLocationAddress] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [image, setImage] = useState<{ uri: string } | null>(null);
  
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
  
    return (
      <SafeAreaProvider>
        <View style={{ flex: 1 }}>
          <SafeAreaView style={styles.container} edges={["top"]}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={{ flex: 1 }}
            >
              <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                {/* Location Name */}
                <View style={styles.inputContainer}>
                  <MaterialCommunityIcons name="map-marker-outline" size={24} color={colors.text} />
                  <TextInput
                    style={styles.input}
                    placeholder="Location Name"
                    placeholderTextColor={colors.text}
                    value={locationName}
                    onChangeText={setLocationName}
                  />
                </View>
  
                {/* Location Address */}
                <View style={styles.inputContainer}>
                  <MaterialCommunityIcons name="map-outline" size={24} color={colors.text} />
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
                    <Image source={{ uri: image.uri }} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                  ) : (
                    <>
                      <MaterialCommunityIcons name="image-outline" size={32} color={colors.text} style={{ marginBottom: 8 }} />
                      <Text style={styles.dropText}>Tap to select an image</Text>
                    </>
                  )}
                </TouchableOpacity>
  
                {/* Description */}
                <View style={[styles.inputContainer, { height: 120, alignItems: 'flex-start', paddingTop: 10, borderWidth: 2 }]}>
                  <MaterialCommunityIcons name="text-box-outline" size={22} color={colors.text} style={{ marginTop: 5 }} />
                  <TextInput
                    style={[styles.input, styles.multilineInput, { textDecorationLine: 'underline' }]}
                    placeholder="Description"
                    placeholderTextColor={colors.text}
                    multiline
                    value={description}
                    onChangeText={setDescription}
                  />
                </View>
  
                {/* Link */}
                <View style={styles.inputContainer}>
                  <MaterialCommunityIcons name="link-variant" size={24} color={colors.text} />
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
                    router.push({
                      pathname: '/preview-upload',
                      params: {
                        name: locationName,
                        address: locationAddress,
                        description,
                        place_link: link,
                        image_uri: image?.uri,
                      }
                    });
                  }}
                >
                  <Text style={styles.nextText}>Next</Text>
                </TouchableOpacity>
              </ScrollView>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </View>
      </SafeAreaProvider>
    );
  }
  