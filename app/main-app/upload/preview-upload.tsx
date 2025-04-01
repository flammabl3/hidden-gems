import React, { useMemo } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ExtendedTheme, useNavigation, useTheme } from '@react-navigation/native';
import supabase from '../../../database/supabase';
import { router } from 'expo-router';

const UploadPreviewScreen = ({ route }: { route: any }) => {
  const navigation = useNavigation();
  const { colors } = useTheme() as ExtendedTheme;
  const { name, description, address, place_link, image_uri } = route.params;

  const styles = useMemo(() =>
      StyleSheet.create({
        container: { flex: 1, backgroundColor: colors.background, padding: 20 },
        title: { fontSize: 28, fontWeight: 'bold', color: colors.text },
        subTitle: { fontSize: 24, fontWeight: '600', marginBottom: 10, color: colors.text },
        image: {
          width: '100%',
          height: 200,
          borderRadius: 15,
          marginBottom: 20,
        },
        descTitle: { fontSize: 20, fontWeight: 'bold', color: colors.text, marginBottom: 5 },
        desc: { fontSize: 16, color: colors.text, marginBottom: 20 },
        button: {
          backgroundColor: colors.background,
          padding: 15,
          marginHorizontal: 2,
          borderRadius: 12,
          alignItems: 'center',
        },
        buttonText: { color: colors.text, fontWeight: 'bold', fontSize: 16 },
      }), [colors]
    );

  const handleConfirmUpload = async () => {
    if (!image_uri || !name || !description) {
      Alert.alert('Missing data', 'Name, description, and image are required.');
      return;
    }

    try {
      // Generate unique file name
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
      const {
        data: { publicUrl },
      } = supabase.storage.from('places-images').getPublicUrl(fileName);

      // Insert into 'places' table
      const { error: insertError } = await supabase.from('places').insert([
        {
          name,
          description,
          address: address || '',
          place_link: place_link || '',
          img_url: publicUrl,
        },
      ]);

      if (insertError) throw insertError;

      Alert.alert('Success', 'Place uploaded successfully!');
      router.push("/")

    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Error', 'Something went wrong during upload.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Review</Text>
      <Text style={styles.subTitle}>{name}</Text>

      <Image source={{ uri: image_uri }} style={styles.image} />

      <Text style={styles.descTitle}>Description</Text>
      <Text style={styles.desc}>{description}</Text>

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


