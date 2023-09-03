import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Constants from "expo-constants";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>
        Todo <Text style={{ color: "#145bde", fontWeight: 400 }}>List</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    width: "100%",
    backgroundColor: "#14141405",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
  },
  text: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#141414",
  },
});
