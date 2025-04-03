import React, { useState, useContext } from "react";
import { View, Text, Switch, TouchableOpacity, Dimensions } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
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

  const { width, height } = Dimensions.get("window");
  const smallDevice = width < 375; // Adjust based on your target devices

  const languages = [
    { label: "English", value: "en" },
    { label: "French", value: "fr" },
    { label: "Spanish", value: "es" },
  ];

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
      <Dropdown
        style={{
          height: height * 0.06,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: width * 0.03,
          marginBottom: height * 0.02,
          backgroundColor: colors.card,
        }}
        placeholderStyle={{
          fontSize: width * 0.045,
          color: colors.text,
        }}
        selectedTextStyle={{
          fontSize: width * 0.045,
          color: colors.text,
        }}
        itemContainerStyle={{
          backgroundColor: colors.card,
        }}
        activeColor={colors.border}
        inputSearchStyle={{
          height: height * 0.06,
          borderColor: colors.border,
          color: colors.text,
          fontSize: width * 0.045,
        }}
        iconStyle={{
          width: 20,
          height: 20,
        }}
        data={languages}
        maxHeight={height * 0.3}
        labelField="label"
        valueField="value"
        value={language}
        onChange={(item) => {
          setLanguage(item.value);
          i18n.changeLanguage(item.value);
        }}
        itemTextStyle={{
          color: colors.text,
          fontSize: width * 0.045,
        }}
      />

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
