import { StyleSheet, View, Image, Dimensions, Text, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from "react";
import { useRouter } from "expo-router";

export default function Register() {
  const { width } = Dimensions.get("window");
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  return (
    <View style={styles.container}>

      {/* Logo Image */}
      <Image
        source={require("../image/big-logo.png")}
        style={[styles.image, { width }]}
      />

      <KeyboardAvoidingView behavior={Platform.OS === "android" ? "height" : "padding"}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scrollContainer}>

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

        </ScrollView>
      </KeyboardAvoidingView>

      {/* Create Account Button */}
      <TouchableOpacity style={styles.create_account_button}>
        <Text style={styles.create_account_text}>Create Account</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => router.push('/')}>
          <Text style={styles.account_text}>
            Already have an account? <Text style={styles.signin_text}>Sign In</Text>
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
    height: 390, 
    resizeMode: "cover",
    marginBottom: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  scrollContainer: {
    alignItems: 'center',
  },
  create_account_button: {
    backgroundColor: "#213141",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 30,
    width: 180,
    alignSelf: 'center',
  },
  create_account_text: {
    color: "#FFFFFF",
    fontSize: 16,  
    fontFamily: "Roboto",
    textAlign: "center",
    fontWeight: "bold",
    lineHeight: 26,
  },
  footer: {
    alignItems: "center",
    marginTop: 35,
  },
  account_text: {
    color: "#D8D9DA",
    fontSize: 16,
    fontFamily: "Roboto",
    textAlign: "center",
    lineHeight: 28,
  },
  signin_text: {
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  halfWidth: {
    width: '48%',  
  },
});

