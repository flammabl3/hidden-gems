import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { Stack } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Layout: React.FC = () => {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {/* Make sure status bar blends well */}
        <StatusBar barStyle="light-content" backgroundColor="#0a1a29" />
        <Stack
          screenOptions={{
            headerShown: false,
            headerStyle: { backgroundColor: "#0a1a29" },
            headerTitle: "HIDDEN GEMS",
            headerTitleStyle: { color: "#ac934e" },
          }}
        />
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Layout;
