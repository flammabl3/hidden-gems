import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import { ExtendedTheme } from "@react-navigation/native";

import Explore from "../app/main-app/explore/explore";
import Settings from "../app/main-app/settings";
import { useTranslation } from "react-i18next";

const Tab = createBottomTabNavigator();

// this component is used in _layout.tsx inside main-app
export default function MyTabs() {
  // cast the theme from our hook as an ExtendedTheme, to use extra properties that we defined.
  const { colors } = useTheme() as ExtendedTheme;
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Hides the header for all screens
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
          if (route.name === "Explore") {
            label = t("explore");
          } else if (route.name === "Settings") {
            label = t("settings");
          }
          return <Text style={{ color, fontSize: 12 }}>{label}</Text>;
        },
        theme: { useTheme },
        // ignore the error here, typing issues.
        tabBarActiveTintColor: colors.secondary,
      })}
    >
      {/* tab names come from the app/main-app/ folder */}
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}
