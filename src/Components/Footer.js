import { StyleSheet, View } from "react-native";
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
    flexDirection: "row",
  },
  text: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#141414",
  },
});
