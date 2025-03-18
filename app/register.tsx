import { 
  StyleSheet, View, Image, Dimensions, Text, TouchableOpacity, 
  TextInput, ScrollView, KeyboardAvoidingView, Platform 
} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { LinearGradient } from "expo-linear-gradient";

export default function Register() {
  const { height, width } = Dimensions.get("window");
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <ScrollView 
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.scrollContainer}
            >
              {/* Input Fields */}
              <View style={styles.inputFieldsContainer}>
                {/* First Name & Last Name */}
                <View style={styles.row}>
                  <View style={[styles.inputContainer, styles.halfWidth]}>
                    <MaterialCommunityIcons name="account-outline" size={24} color="#201A23" />
                    <TextInput
                      style={styles.input}
                      placeholder="First Name"
                      placeholderTextColor="#2B3B49"
                      value={firstName}
                      onChangeText={setFirstName}
                    />
                  </View>
                  <View style={[styles.inputContainer, styles.halfWidth]}>
                    <MaterialCommunityIcons name="account-outline" size={24} color="#201A23" />
                    <TextInput
                      style={styles.input}
                      placeholder="Last Name"
                      placeholderTextColor="#2B3B49"
                      value={lastName}
                      onChangeText={setLastName}
                    />
                  </View>
                </View>

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

                {/* Confirm Password Input */}
                <View style={styles.inputContainer}>
                  <MaterialCommunityIcons name="lock-outline" size={24} color="#201A23" />
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm password"
                    placeholderTextColor="#2B3B49"
                    secureTextEntry={!showConfirmPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                  />
                  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <MaterialCommunityIcons
                      name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                      size={24}
                      color="#201A23"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
  
          {/* Create Account Button and Footer */}
          <View style={styles.footerContainer}>
            <TouchableOpacity style={styles.createAccountButton}>
              <Text style={styles.createAccountText}>Create Account</Text>
            </TouchableOpacity>
  
            {/* Footer */}
            <View style={styles.footer}>
              <TouchableOpacity onPress={() => router.push('/')}>
                <Text style={styles.accountText}>
                  Already have an account? <Text style={styles.signInText}>Sign In</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
  
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  row: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  halfWidth: {
    width: '48%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderBottomWidth: 2,
    borderColor: '#201A23',
    backgroundColor: '#5A6B75',
    paddingHorizontal: '5%',
    width: '80%', 
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
  createAccountButton: {
    backgroundColor: "#213141",
    paddingVertical: '4%',
    borderRadius: 8,
    alignItems: "center",
    width: '50%', 
    alignSelf: 'center',
    marginBottom: '10%',
  },
  createAccountText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  footerContainer: {
    justifyContent: 'flex-end',
    paddingBottom: '5%',
  },
  footer: {
    alignItems: "center",
  },
  accountText: {
    color: "#D8D9DA", 
    fontSize: 16, 
  },
  signInText: {
    color: "#213141",
    fontWeight: "bold",
  },
});
