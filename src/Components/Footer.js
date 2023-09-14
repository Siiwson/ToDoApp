import { StyleSheet, View, useColorScheme } from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { COLORS } from "../../Colors";

export default function Footer({ navigation }) {
  //Color theme
  const colorScheme = useColorScheme();
  const themeFooterStyle =
    colorScheme === "light" ? styles.lightFooter : styles.darkFooter;

  return (
    <View style={[styles.footer, themeFooterStyle]}>
      <AntDesign
        name='home'
        size={40}
        color={colorScheme === "light" ? COLORS.LightText : COLORS.DarkText}
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  lightFooter: {
    backgroundColor: COLORS.LightBackground,
  },
  darkFooter: {
    backgroundColor: COLORS.DarkBackground,
  },
});
