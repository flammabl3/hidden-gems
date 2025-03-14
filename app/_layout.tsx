import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Stack } from "expo-router";

const Layout: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Stack
        screenOptions={{
          headerTitle:'HIDDEN GEMS', // Hide header
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0, 
  },
});

export default Layout;
