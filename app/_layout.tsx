import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { Stack } from "expo-router";

const Layout: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Make sure status bar blends well */}
      <StatusBar barStyle="dark-content" backgroundColor="#0a1a29" />
      <Stack
        screenOptions={{
          headerShown: false,
          headerStyle: { backgroundColor: "#0a1a29" },
          headerTitle: "HIDDEN GEMS",
          headerTitleStyle: { color: "#ac934e" },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0, // Remove any top margin to ensure it's right at the top
  },
});

export default Layout;
