// packages : npm expo install , npm install react-native-maps , npm install expo-linear-gradient , npm install expo-router, npm install expo-location, npm install @supabase/supabase-js
/* todo: 
1.add the regex to email and password fields
2.add the forgot password button and do the recovery question logic
3.hash the password before saving it in the database
4.use session to track if the user is logged in or not
*/

import { 
  StyleSheet, View, Image, Dimensions, Text, TouchableOpacity, 
  TextInput, ScrollView, KeyboardAvoidingView, Platform 
} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { LinearGradient } from "expo-linear-gradient";
import { loginUser } from '../database/crud_supabase';

export default function Index() {
  const { height, width } = Dimensions.get("window");  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <SafeAreaView style={styles.container} edges={["top"]}>
  
          {/* Gradient Background with Logo */}
          <LinearGradient
            style={styles.imageContainer}
            colors={['#2E3E4C', '#031221']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.1, y: 0.7 }}
          >  
            <Image
              source={require("../image/hiddengems-logo.png")}
              style={styles.image}
              resizeMode="contain"
            />
          </LinearGradient> 
  
          {/* KeyboardAvoidingView for the input fields */}
          <KeyboardAvoidingView 
            style={styles.keyboardContainer} 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <ScrollView 
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.scrollContainer}
            >
              {/* Input Fields */}
              <View style={styles.inputFieldsContainer}>
                {/* Email Input */}
                <View style={styles.inputContainer}>
                  <MaterialCommunityIcons name="email-outline" size={24} color="#201A23" />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="#2B3B49"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
    
                {/* Password Input */}
                <View style={styles.inputContainer}>
                  <MaterialCommunityIcons name="lock-outline" size={24} color="#201A23" />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    placeholderTextColor="#2B3B49"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <MaterialCommunityIcons 
                      name={showPassword ? 'eye-outline' : 'eye-off-outline'} 
                      size={24} 
                      color="#201A23" 
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
  
          {/* Sign In Button - Position it at the bottom */}
          <TouchableOpacity 
          style={styles.signInButton} 
          onPress={async () => {
          const { success, error } = await loginUser(email, password);
    
          if (success) {
      // Redirect to the Explore page if login is successful
          router.push('./main-app/explore/explore');
          } else {
      // Show an alert if there's an error
          alert('Login failed: ' + error);
          }
          }}
          >
  <Text style={styles.signInText}>Sign In</Text>
</TouchableOpacity>
  
          {/* Footer - Position it at the bottom as well */}
          <View style={styles.footer}>
            <TouchableOpacity onPress={() => router.push('/register')}>
              <Text style={styles.accountText}>
                Don't have an account? <Text style={styles.createText}>Create now</Text>
              </Text>
            </TouchableOpacity>
          </View>
  
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: "#5A6B75",
  },
  imageContainer: {
    height: '45%',
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  image: {
    width: '70%',
    height: '100%',
  },
  keyboardContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: '5%',
  },
  scrollContainer: {
    flexGrow: 1, 
    justifyContent: 'center',
    paddingVertical: '5%',
  },
  inputFieldsContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: '5%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#201A23',
    backgroundColor: '#5A6B75',
    paddingHorizontal: '5%',
    width: '90%', 
    height: 55, 
    marginVertical: 12, 
    borderRadius: 8,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 10,
    color: '#201A23',
  },
  signInButton: {
    backgroundColor: "#213141",
    paddingVertical: '4%',
    borderRadius: 8,
    alignItems: "center",
    width: '50%', 
    alignSelf: 'center',
    marginBottom: '5%',
  },
  signInText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    alignItems: "center",
    marginBottom: '5%',
  },
  accountText: {
    color: "#D8D9DA", 
    fontSize: 16,
  },
  createText: {
    color: "#213141",
    fontWeight: "bold",
  },
  debugText: {
    color: "#D8D9DA",
    marginTop: 5,
  }
});
