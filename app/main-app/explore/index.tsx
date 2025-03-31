import React from 'react';
import { createStackNavigator, Header } from '@react-navigation/stack';
import ExploreMain from './explore';
import PlacePage from './place-page';
import { useEffect } from 'react';

const Stack = createStackNavigator();

export default function ExploreStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen 
        name="ExploreMain" 
        component={ExploreMain} 
        options={{ title: 'Explore Main' }} 
      />
      <Stack.Screen 
        name="PlacePage" 
        component={PlacePage} 
        options={{ title: 'Place' }} 
      />
    </Stack.Navigator>
  );
}