import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MyTabs from '../../components/bar-navigator';
import { LocationProvider } from "../../components/location-context";

const Layout: React.FC = () => {
  return (
    <LocationProvider>
      <SafeAreaProvider>
        <View style={styles.container}>
          {/* Make sure status bar blends well */}
          <StatusBar barStyle="light-content" backgroundColor="#0a1a29" />
          <MyTabs/>
        </View>
      </SafeAreaProvider>
    </LocationProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Layout;
