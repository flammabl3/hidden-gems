import React, { useState, useContext } from "react";
import { View, Text, Switch, TouchableOpacity } from "react-native";
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

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 20 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: colors.text,
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        {t("settings")}
      </Text>

      <Text style={{ color: colors.text, fontSize: 18 }}>{t("language")}</Text>
      <Picker
        selectedValue={language}
        onValueChange={(itemValue) => handleLanguageChange(itemValue)}
        style={{ color: colors.text }}
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
          marginVertical: 10,
          marginTop: 80,
        }}
      >
        <Text style={{ color: colors.text, fontSize: 18 }}>
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
          marginVertical: 10,
          marginTop: 80,
        }}
      >
        <Text style={{ color: colors.text, fontSize: 18 }}>
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
              paddingVertical: 8,
              paddingHorizontal: 16,
            }}
          >
            <Text style={{ color: colors.text, fontSize: 16 }}>
              {t("dark")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSelectTheme(false)}
            style={{
              backgroundColor: !dark ? colors.secondary : colors.card,
              paddingVertical: 8,
              paddingHorizontal: 16,
            }}
          >
            <Text style={{ color: colors.text, fontSize: 16 }}>
              {t("light")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#D9534F",
          padding: 10,
          borderRadius: 5,
          marginTop: 200,
        }}
      >
        <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>
          {t("deleteAccount")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
