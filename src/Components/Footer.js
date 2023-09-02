import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function Footer({ navigation }) {
  return (
    <View style={styles.footer}>
      <AntDesign
        name='home'
        size={40}
        color='#141414'
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#14141405",
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    zIndex: 5,
    borderTopWidth: 1,
    borderTopColor: "#14141410",
    flexDirection: "row",
  },
  text: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#141414",
  },
});
