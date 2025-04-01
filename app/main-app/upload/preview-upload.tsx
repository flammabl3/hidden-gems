/*import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import supabase from '../../../database/supabase';

const UploadPreviewScreen = ({ route }) => {
  const navigation = useNavigation();
  const { name, description, address, place_link, image } = route.params;

  const handleConfirmUpload = async () => {
    if (!image || !name || !description) {
      Alert.alert('Missing data', 'Name, description, and image are required.');
      return;
    }

    try {
      // Generate unique file name
      const fileExt = image.uri.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('places-images') // Your bucket name
        .upload(fileName, {
          uri: image.uri,
          type: 'image/jpeg', // or image.type if available
          name: fileName,
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
      navigation.navigate('/explore'); // or wherever you'd like to go next

    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Error', 'Something went wrong during upload.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Review</Text>
      <Text style={styles.subTitle}>{name}</Text>

      <Image source={{ uri: image.uri }} style={styles.image} />

      <Text style={styles.descTitle}>Description</Text>
      <Text style={styles.desc}>{description}</Text>

      <TouchableOpacity style={styles.button} onPress={handleConfirmUpload}>
        <Text style={styles.buttonText}>Confirm and Upload</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#6E8690', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: 'white' },
  subTitle: { fontSize: 24, fontWeight: '600', marginBottom: 10, color: 'white' },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginBottom: 20,
  },
  descTitle: { fontSize: 20, fontWeight: 'bold', color: 'white', marginBottom: 5 },
  desc: { fontSize: 16, color: 'white', marginBottom: 20 },
  button: {
    backgroundColor: '#1C2A36',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});

export default UploadPreviewScreen;*/


