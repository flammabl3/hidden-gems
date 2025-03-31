import React, { useState, createContext } from "react";
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
  Theme,
  ExtendedTheme,
} from "@react-navigation/native";

import { Slot } from "expo-router";

import { AuthProvider } from "../database/auth-context";
import "../i18n";

// Extend the theme type to use more fields, since the default theme doesn't have a secondary colour.
declare module "@react-navigation/native" {
  export type ExtendedTheme = Theme & {
    colors: Theme["colors"] & {
      secondary: string;
    };
  };
}

export const ThemeToggleContext = createContext<() => void>(() => {});

const WEB_FONT_STACK =
  'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

const CustomDarkTheme: ExtendedTheme = {
  ...DarkTheme,
  dark: true,
  colors: {
    primary: "rgb(201, 178, 104)", // Keeping the yellow highlights
    secondary: "rgb(172, 147, 78)", // Slightly adjusted for contrast
    background: "rgb(33, 49, 65)", // Dark blue as the main background
    card: "rgb(90, 107, 117)", // Light gray-blue for the bottom navbar
    text: "rgb(216, 217, 218)", // Light text for contrast
    border: "rgb(90, 107, 117)", // Matching the new card color
    notification: "rgb(255, 69, 58)",
  },
};

const CustomLightTheme: ExtendedTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    primary: "rgb(33, 49, 65)", // Adjust if needed
    secondary: "rgb(201, 178, 104)", // Closer to the yellow highlights
    background: "rgb(90, 107, 117)", // Matched to the Figma background
    card: "#0A1A29", // Navbar color
    text: "rgb(224, 224, 224)", // Black for readability
    border: "rgb(99, 142, 167)", // Border matching background
    notification: "rgb(255, 69, 58)",
  },
};

export default function RootLayout() {
  // Set default theme to the light theme
  const [theme, setTheme] = useState<ExtendedTheme>(CustomLightTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      console.log("Toggling theme. Current dark:", prevTheme.dark);
      return prevTheme.dark ? CustomLightTheme : CustomDarkTheme;
    });
  };

  return (
    <AuthProvider>
      <ThemeProvider value={theme}>
        <ThemeToggleContext.Provider value={toggleTheme}>
          {/* Remove the NavigationContainer (provided by expo-router) 
                and add a key to Slot so it remounts when the theme changes. */}
          <Slot key={theme.dark.toString()} />
        </ThemeToggleContext.Provider>
      </ThemeProvider>
    </AuthProvider>
  );
}
