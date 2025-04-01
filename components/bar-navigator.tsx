import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import { ExtendedTheme } from "@react-navigation/native";

import Explore from "../app/main-app/explore";
import Settings from "../app/main-app/settings";
import UploadStack from "../app/main-app/upload";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";

const Tab = createBottomTabNavigator();

// this component is used in _layout.tsx inside main-app
export default function MyTabs() {
  // cast the theme from our hook as an ExtendedTheme, to use extra properties that we defined.
  const { colors } = useTheme() as ExtendedTheme;
  const { t } = useTranslation();


  return (
    <Tab.Navigator
      initialRouteName="Explore"
      backBehavior="initialRoute"
      screenOptions={({ route }) => ({
        headerShown: false, // Hides the header for all screens
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ color, size }) => {
          // Set icon based on the route name
          if (route.name === "Explore") {
            return (
              <MaterialCommunityIcons name="map" color={color} size={size} />
            );
          } else if (route.name === "Settings") {
            return (
              <MaterialCommunityIcons
                name="cog-outline"
                color={color}
                size={size}
              />
            );
          } else if (route.name === "Upload") {
            return (
              <MaterialCommunityIcons
                name="upload"
                color={color}
                size={size}
              />
            );
          } else {
            return (
              <MaterialCommunityIcons
                name="help-circle-outline"
                color={color}
                size={size}
              />
            );
          }
        },
        tabBarLabel: ({ color }) => {
          let label = "";
          if (route.name === "Upload") {
            label = t("upload");
          } 
          if (route.name === "Explore") {
            label = t("explore");
          } else if (route.name === "Settings") {
            label = t("settings");
          }
          return <Text style={{ color, fontSize: 12 }}>{label}</Text>;
        },
        theme: { useTheme },
        tabBarActiveTintColor: colors.secondary,
      })}
    >
      {/* tab names come from the app/main-app/ folder */}
      
      <Tab.Screen name="Explore" component={Explore}/>
      <Tab.Screen name="Upload" component={UploadStack} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}
