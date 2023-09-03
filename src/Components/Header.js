import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Constants from "expo-constants";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>
        Todo <Text style={{ color: "#145bde" }}>List</Text>
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    zIndex: 5,
  },
  text: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#141414",
  },
});
