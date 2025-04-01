import React, { useState, useContext } from "react";
import { View, Text, Switch, TouchableOpacity, Dimensions } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ExtendedTheme, useTheme } from "@react-navigation/native";
import { ThemeToggleContext } from "../../_layout";
import { useTranslation } from "react-i18next";

const SettingsScreen = () => {
  const { colors, dark } = useTheme() as ExtendedTheme;
  const toggleTheme = useContext(ThemeToggleContext);
  const { t, i18n } = useTranslation();

  const [language, setLanguage] = useState(i18n.language);
  const [notifications, setNotifications] = useState(false);

  const handleSelectTheme = (selectedDark: boolean) => {
    if (dark !== selectedDark) {
      toggleTheme();
    }
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const { width, height } = Dimensions.get("window");
  const smallDevice = width < 375; // Adjust based on your target devices

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: width * 0.05 }}>
      <Text
        style={{
          fontSize: smallDevice ? width * 0.06 : width * 0.07,
          fontWeight: "bold",
          color: colors.text,
          textAlign: "center",
          marginBottom: height * 0.03,
        }}
      >
        {t("settings")}
      </Text>

      <Text style={{ color: colors.text, fontSize: width * 0.05 }}>{t("language")}</Text>
      <Picker
        selectedValue={language}
        onValueChange={(itemValue) => handleLanguageChange(itemValue)}
        style={{ color: colors.text, width: "100%", height: height * 0.06 }}
      >
        <Picker.Item label="English" value="en" />
        <Picker.Item label="French" value="fr" />
        <Picker.Item label="Spanish" value="es" />
      </Picker>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginVertical: height * 0.02,
          marginTop: height * 0.1,
        }}
      >
        <Text style={{ color: colors.text, fontSize: width * 0.05 }}>
          {t("notifications")}
        </Text>
        <Switch
          value={notifications}
          onValueChange={setNotifications}
          thumbColor={notifications ? "#F0E6CC" : "#222"}
          trackColor={{ false: "#222", true: "#AC934E" }}
        />
      </View>

      {/* control for theme appearance */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginVertical: height * 0.02,
          marginTop: height * 0.1,
        }}
      >
        <Text style={{ color: colors.text, fontSize: width * 0.05 }}>
          {t("appearance")}
        </Text>
        <View
          style={{
            flexDirection: "row",
            borderWidth: 1,
            borderColor: colors.secondary,
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <TouchableOpacity
            onPress={() => handleSelectTheme(true)}
            style={{
              backgroundColor: dark ? colors.secondary : colors.card,
              paddingVertical: height * 0.02,
              paddingHorizontal: width * 0.04,
            }}
          >
            <Text style={{ color: colors.text, fontSize: width * 0.045 }}>
              {t("dark")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSelectTheme(false)}
            style={{
              backgroundColor: !dark ? colors.secondary : colors.card,
              paddingVertical: height * 0.02,
              paddingHorizontal: width * 0.04,
            }}
          >
            <Text style={{ color: colors.text, fontSize: width * 0.045 }}>
              {t("light")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#D9534F",
          padding: width * 0.04,
          borderRadius: 5,
          marginTop: height * 0.2,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: width * 0.05 }}>
          {t("deleteAccount")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
