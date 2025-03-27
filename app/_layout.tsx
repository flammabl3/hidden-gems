
import {
    ThemeProvider,
    DarkTheme,
    DefaultTheme,
    Theme,
    ExtendedTheme,
  } from "@react-navigation/native";
  
import { Slot } from 'expo-router';
import { Platform } from "react-native";
import { AuthProvider } from "../database/auth-context";

// Extend the theme type to use more fields, since the default theme doesn't have a secondary colour.
declare module "@react-navigation/native" {
  export type ExtendedTheme = Theme & {
    colors: Theme["colors"] & {
      secondary: string;
    };
  };
}
  
export default function RootLayout() {
    return (
      <AuthProvider>
        <ThemeProvider value={CustomDarkTheme}>
            <Slot />
        </ThemeProvider>
      </AuthProvider>
    );
}

  const WEB_FONT_STACK =
  'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

const CustomDarkTheme: ExtendedTheme = {
  ...DarkTheme,
  dark: true,
  colors: {
    primary: 'rgb(33, 49, 65)',
    secondary: 'rgb(172, 147, 78)',
    background: 'rgb(90, 107, 117)',
    card: 'rgb(33, 49, 65)',
    text: 'rgb(216, 217, 218)',
    border: 'rgb(216, 217, 218)',
    notification: 'rgb(255, 69, 58)',
  },
};

const CustomLightTheme: ExtendedTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    primary: 'rgb(216, 217, 218)',
    secondary: 'rgb(172, 147, 78)',
    background: 'rgb(216, 217, 218)',
    card: 'rgb(33, 49, 65)',
    text: 'rgb(216, 217, 218)',
    border: 'rgb(216, 217, 218)',
    notification: 'rgb(255, 69, 58)',
  },
};