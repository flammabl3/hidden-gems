// packages : npm expo install , npm install react-native-maps , npm install expo-linear-gradient , npm install expo-router, npm install expo-location, npm install @supabase/supabase-js
/* todo: 
1.add the regex to email and password fields
2.add the forgot password button and do the recovery question logic
3.hash the password before saving it in the database
4.use session to track if the user is logged in or not
5. Show what user is logged in for the last assignment.
*/

// Packages Downloaded 
// npm expo install 
// npm install expo-router

//platform , scroll view and keyboard avoiding view are for the input fields to be visible when the keyboard is open
//MaterialCommunityIcons is for the icons used in the input fields
//Dimensions is for the width of the screen


//To Do: Regex for email validation, password validation - 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
//To Do: Add a forgot password text and link to the forgot password page
//TO Do: Add database logic to check if the email and password are correct and stored in the database
import { StyleSheet, View, Image, Dimensions, Text, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { LinearGradient } from "expo-linear-gradient";

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
    paddingBottom: 30,
  },
  imageContainer: {
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  image: {
    height: '100%',
    aspectRatio: 1,
    resizeMode: 'contain'
  },
  scrollContainer: {
    alignItems: 'center',
  },
  sign_in_button: {
    backgroundColor: "#213141",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: "center",
    width: 150,
    alignSelf: 'center',
  },
  sign_in_text: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "Roboto",
    textAlign: "center",
    fontWeight: "bold",
    lineHeight: 28,
  },
  footer: {
    alignItems: "center",
  },
  account_text: {
    color: "#D8D9DA", 
    fontSize: 16,
    fontFamily: "Roboto",
    textAlign: "center",
    lineHeight: 28,
  },
  create_text: {
    color: "#213141",
    fontSize: 16,
    fontFamily: "Roboto",
    fontWeight: "bold",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#201A23',
    backgroundColor: '#5A6B75',
    paddingHorizontal: 10,
    alignSelf: 'center',
    width: '80%',
    marginVertical: 5,
    padding: 1
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    color: '#201A23',
  },
});
