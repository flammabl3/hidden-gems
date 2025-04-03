import React, { useMemo, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { ExtendedTheme, useNavigation, useTheme } from '@react-navigation/native';
import supabase from '../../../database/supabase';
import { router } from 'expo-router';
import { useAuth } from '../../../database/auth-context';
import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system';

const UploadPreviewScreen = ({ route }: { route: any }) => {
  const navigation = useNavigation();
  const { colors } = useTheme() as ExtendedTheme;
  const { name, description, long_description, coordinates, address, place_link, image_uri, price } = route.params.params;

  const [ uploading, setUploading ] = useState(false);

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
    if (uploading)
        return;
    setUploading(true);
    if (!coordinates.latitude || !coordinates.longitude || !name || !description) {
      Alert.alert('Missing data', 'A name, coordinates, and a short description are required.');
      setUploading(false);
      return;
    }

    try {
      // Generate unique file name
      var imgUrl = null;

      if (image_uri) {
        const fileExt = image_uri.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;

        const base64 = await FileSystem.readAsStringAsync(image_uri, { encoding: 'base64' });

        // Upload to Supabase Storage

        try {
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('place-images')
            .upload(fileName, decode(base64),
            {
              contentType: "image/*",
              upsert: false
            }
          );
        
          if (uploadError) {
            console.error("Upload Error:", uploadError);
            setUploading(false);
            return;
          } else {
            console.log("Upload Success:", uploadData);
          }

          const { data: { publicUrl } } = supabase.storage.from('place-images').getPublicUrl(fileName);

          imgUrl = publicUrl;
        } catch (e) {
          console.error("Unexpected Error:", e);
          setUploading(false);
          return;
        }
      }

      const userId = session?.user?.id;

      // Insert into 'places' table
      const { error: insertError } = await supabase.from('places').insert([
        {

          name,
          address: address || null,
          description,
          img_url: imgUrl, // nullable
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
      setUploading(false);
      router.push("/main-app/")

    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Error', 'Something went wrong during upload.');
      setUploading(false);
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

      <TouchableOpacity style={styles.button} onPress={handleConfirmUpload} disabled={uploading}>
        {!uploading ?
        <Text style={styles.buttonText}>Confirm and Upload</Text>
        :
        <ActivityIndicator size="large" />
        }
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigation.goBack}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UploadPreviewScreen;


