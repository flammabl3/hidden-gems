import React, { useMemo } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ExtendedTheme, useNavigation, useTheme } from '@react-navigation/native';
import supabase from '../../../database/supabase';
import { router } from 'expo-router';
import { useAuth } from '../../../database/auth-context';

const UploadPreviewScreen = ({ route }: { route: any }) => {
  const navigation = useNavigation();
  const { colors } = useTheme() as ExtendedTheme;
  const { name, description, long_description, coordinates, address, place_link, image_uri, price } = route.params.params;

  const { session } = useAuth();

  const styles = useMemo(() =>
      StyleSheet.create({
        container: { flex: 1, backgroundColor: colors.background, padding: 20 },
        title: { fontSize: 28, fontWeight: 'bold',  marginBottom: 10, color: colors.text },
        subTitle: { fontSize: 24, fontWeight: '600', color: colors.text },
        image: {
          width: '100%',
          height: 200,
          borderRadius: 15,
          marginBottom: 20,
          backgroundColor: colors.primary
        },
        smallerTitle: { fontSize: 20, fontWeight: 'bold', color: colors.text, marginBottom: 5 },
        desc: { fontSize: 16, color: colors.text, marginBottom: 20 },
        text: {
          color: colors.text,
          fontSize: 18,
        },
        button: {
          backgroundColor: colors.primary,
          padding: 15,
          marginHorizontal: 2,
          borderRadius: 12,
          alignItems: 'center',
          paddingVertical: '4%',
          width: '50%',
          alignSelf: 'center',
          marginTop: '10%',
        },
        buttonText: { color: colors.text, fontWeight: 'bold', fontSize: 16 },
      }), [colors]
    );

  const handleConfirmUpload = async () => {
    if (!coordinates.latitude || !coordinates.longitude || !name || !description) {
      Alert.alert('Missing data', 'A name, coordinates, and a short description are required.');
      return;
    }

    try {
      // Generate unique file name
      var publicUrl = null;

      if (image_uri) {
        const fileExt = image_uri.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;

        const response = await fetch(image_uri);
        const fileBody = await response.blob();

        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('places-images') // Your bucket name
          .upload(fileName, fileBody, {
            contentType: "image/jpeg", // Set the appropriate content type
          });

        if (uploadError) throw uploadError;

        // Get the public URL
        publicUrl = {
          data: { publicUrl },
        } = supabase.storage.from('places-images').getPublicUrl(fileName);
      }

      const userId = session?.user?.id;

      // Insert into 'places' table
      const { error: insertError } = await supabase.from('places').insert([
        {

          name,
          address: address || null,
          description,
          img_url: publicUrl, // nullable
          place_link: place_link || null,
          user_id: userId,
          coordinate_lat: coordinates.latitude,
          coordinate_long: coordinates.longitude,
          long_description: long_description,
          price: price
        },
      ]);

      if (insertError) throw insertError;

      Alert.alert('Success', 'Place uploaded successfully!');
      router.push("/main-app/")

    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Error', 'Something went wrong during upload.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Review</Text>
      <Text style={styles.subTitle}>{name}</Text>
      <Text style={styles.smallerTitle}>{description}</Text>
      {address &&
        <Text style={styles.text}>Address: {address}</Text>
      }
      {place_link &&
        <Text style={styles.text}>Link: {place_link}</Text>
      }
      <Text style={styles.text}>Price: {price > 0 ? price : "Free"}</Text>
      
      {coordinates && coordinates.longitude && coordinates.latitude &&
      <View>
        <Text style={styles.text}>Coordinates: {coordinates.longitude}, {coordinates.latitude}</Text>
      </View>
      }

      <Image source={{ uri: image_uri }} style={styles.image} />

      {long_description && 
      <View>
        <Text style={styles.smallerTitle}>Description</Text>
        <Text style={styles.desc}>{long_description}</Text>
      </View>
      }

      <TouchableOpacity style={styles.button} onPress={handleConfirmUpload}>
        <Text style={styles.buttonText}>Confirm and Upload</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigation.goBack}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UploadPreviewScreen;


