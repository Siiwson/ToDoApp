import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Constants from "expo-constants";
import { COLORS } from "../../Colors";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>
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
    backgroundColor: COLORS.background,
  },
  text: {
    fontSize: 50,
    fontWeight: "bold",
    color: COLORS.text,
  },
});
