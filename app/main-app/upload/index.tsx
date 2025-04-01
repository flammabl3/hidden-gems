import React from 'react';
import { createStackNavigator, Header } from '@react-navigation/stack';
import UploadForm from './upload-form';
import UploadPreviewScreen from './preview-upload';
import { useEffect } from 'react';

const Stack = createStackNavigator();

export default function UploadStack() {
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen 
        name="UploadForm" 
        component={UploadForm} 
        options={{ title: 'Upload Form' }} 
      />
      <Stack.Screen 
        name="UploadPreviewScreen" 
        component={UploadPreviewScreen} 
        options={{ title: 'Upload Preview' }} 
      />
    </Stack.Navigator>
  );
}