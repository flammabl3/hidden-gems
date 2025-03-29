import { 
  StyleSheet, View, Image, Dimensions, Text, TouchableOpacity, 
  TextInput, ScrollView, KeyboardAvoidingView, Platform 
} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMemo, useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../database/auth-context";
import { useTranslation } from 'react-i18next';
import { ExtendedTheme, useTheme } from "@react-navigation/native";

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
  const { t } = useTranslation();

 

    const {colors} = useTheme() as ExtendedTheme;
    const styles = useMemo(() => 
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: colors.background,
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
          borderColor: colors.text,
          backgroundColor: colors.background,
          paddingHorizontal: '5%',
          width: '80%', 
          height: 55, 
          marginVertical: 12,
        },
        input: {
          flex: 1,
          height: '100%',
          paddingHorizontal: 10,
          color: colors.text,
        },
        createAccountButton: {
          backgroundColor: colors.primary,
          paddingVertical: '4%',
          borderRadius: 8,
          alignItems: "center",
          width: '50%', 
          alignSelf: 'center',
          marginBottom: '5%',
        },
        createAccountText: {
          color: colors.text,
          fontSize: 18,
          fontWeight: "bold",
        },
        footer: {
          flexDirection: "column",
          alignItems: "center",
          marginBottom: '5%',
        },
        accountText: {
          color: colors.text,
          fontSize: 16,
        },
        signInText: {
          fontWeight: 'bold',
          color: colors.primary,
        }
      }), [colors]
    );
  
  const { register, loading } = useAuth();

  async function signUp() {

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
  
    if (!passwordRegex.test(password)) {
      alert('Password must be at least 8 characters long, contain 1 uppercase letter, 1 lowercase letter, 1 number and a special character .');
      return;
    }
  
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
  
   
  
      const { success, error } = await register({ 
        first_name: firstName, 
        last_name: lastName, 
        email: email, 
        password: password
      });
  
      if (error) {
        alert('Registration failed: ' + error);
      } else if (success) {
        router.push('/');
      }
    }
  
  

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
                    <MaterialCommunityIcons name="account-outline" size={24} color={colors.text} />
                    <TextInput
                      style={styles.input}
                      placeholder="First Name"
                      placeholderTextColor={colors.text}
                      value={firstName}
                      onChangeText={setFirstName}
                    />
                  </View>
                  <View style={[styles.inputContainer, styles.halfWidth]}>
                    <MaterialCommunityIcons name="account-outline" size={24} color={colors.text} />
                    <TextInput
                      style={styles.input}
                      placeholder="Last Name"
                      placeholderTextColor={colors.text}
                      value={lastName}
                      onChangeText={setLastName}
                    />
                  </View>
                </View>

                {/* Email Input */}
                <View style={styles.inputContainer}>
                  <MaterialCommunityIcons name="email-outline" size={24} color={colors.text} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor={colors.text}
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>

                {/* Password Input */}
                <View style={styles.inputContainer}>
                  <MaterialCommunityIcons name="lock-outline" size={24} color={colors.text} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    placeholderTextColor={colors.text}
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <MaterialCommunityIcons
                      name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                      size={24}
                      color={colors.text}
                    />
                  </TouchableOpacity>
                </View>

                {/* Confirm Password Input */}
                <View style={styles.inputContainer}>
                  <MaterialCommunityIcons name="lock-outline" size={24} color={colors.text} />
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm password"
                    placeholderTextColor={colors.text}
                    secureTextEntry={!showConfirmPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                  />
                  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <MaterialCommunityIcons
                      name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                      size={24}
                      color={colors.text}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
  
          {/* Create Account Button and Footer */}
          <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.createAccountButton}
              onPress={async () => {
                if (password !== confirmPassword) {
                  alert('Passwords do not match!');
                  return;
                }

                await signUp();

              }}
            >
              <Text style={styles.createAccountText}>Create Account</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/')}>
              <Text style={styles.accountText}>
                Already have an account? <Text style={styles.signInText}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </View>

  
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}

