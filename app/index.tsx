
// Packages Downloaded 
// npm expo install 
// npm install expo-router

//platform , scroll view and keyboard avoiding view are for the input fields to be visible when the keyboard is open
//MaterialCommunityIcons is for the icons used in the input fields
//Dimensions is for the width of the screen
import { StyleSheet, View, Image, Dimensions, Text, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from "react";
import { useRouter } from "expo-router";

export default function Index() {
  const { width } = Dimensions.get("window");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  return (
    <View style={styles.container}>

      {/* Logo Image */}
      <Image
        source={require("../image/big-logo.png")}
        style={[styles.image, { width }]}
      />

      {/* Wrapping only input fields inside a ScrollView */}
      <KeyboardAvoidingView behavior={Platform.OS === "android" ? "height" : "padding"}>
        <ScrollView 
          keyboardShouldPersistTaps="handled" 
          keyboardDismissMode="on-drag" 
          contentContainerStyle={styles.scrollContainer}
        >

          {/* Email Input field */}
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

          {/* Password Input field */}
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
            {/* Toggle password visibility */}
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <MaterialCommunityIcons
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={24}
                color="#201A23"
              />
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>

      {/* Sign In Button */}
      <TouchableOpacity style={styles.sign_in_button}>
        <Text style={styles.sign_in_text}>Sign In</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text style={styles.account_text}>
            Don't have an account? <Text style={styles.create_text}>Create now</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5A6B75",
    paddingBottom: 30,
  },
  image: {
    height: 420,
    resizeMode: "cover",
    marginBottom: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
    marginTop: 100,
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
    marginTop: 35,
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
    marginBottom: 15,
    alignSelf: 'center',
    width: '80%',
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    color: '#201A23',
  },
});
