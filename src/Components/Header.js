import { StyleSheet, Text, View, useColorScheme } from "react-native";
import React from "react";
import Constants from "expo-constants";
import { COLORS } from "@/Colors";

export default function Header() {
  //Color theme
  const colorScheme = useColorScheme();
  const themeTextStyle =
    colorScheme === "light" ? styles.lightThemeText : styles.darkThemeText;
  const themeHeaderStyle =
    colorScheme === "light" ? styles.lightHeader : styles.darkHeader;

  return (
    <View style={[styles.header, themeHeaderStyle]}>
      <Text style={[styles.text, themeTextStyle]}>
        Todo{" "}
        <Text style={{ color: COLORS.listColor, fontWeight: 400 }}>List</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
  },
  text: {
    fontSize: 50,
    fontWeight: "bold",
  },
  lightHeader: {
    backgroundColor: COLORS.LightBackground,
  },
  darkHeader: {
    backgroundColor: COLORS.DarkBackground,
  },
  lightThemeText: {
    color: COLORS.LightText,
  },
  darkThemeText: {
    color: COLORS.DarkText,
  },
});
