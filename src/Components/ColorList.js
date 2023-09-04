import { StyleSheet, View, Pressable } from "react-native";
import React from "react";

export default function ColorList({ GlobalState }) {
  const { setColor } = GlobalState;

  return (
    <View style={styles.colors}>
      <Pressable style={styles.color1} onPress={() => setColor("#69f7ff")} />
      <Pressable style={styles.color2} onPress={() => setColor("#eded")} />
      <Pressable style={styles.color3} onPress={() => setColor("#97ff78")} />
      <Pressable style={styles.color4} onPress={() => setColor("#ff78f8")} />
      <Pressable style={styles.color5} onPress={() => setColor("#ff7878")} />
      <Pressable style={styles.color6} onPress={() => setColor("#faff78")} />
    </View>
  );
}

const styles = StyleSheet.create({
  colors: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  color1: {
    backgroundColor: "#69f7ff",
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
    borderWidth: 1,
  },
  color2: {
    backgroundColor: "#eded",
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
    borderWidth: 1,
  },
  color3: {
    backgroundColor: "#97ff78",
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
    borderWidth: 1,
  },
  color4: {
    backgroundColor: "#ff78f8",
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
    borderWidth: 1,
  },
  color5: {
    backgroundColor: "#ff7878",
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
    borderWidth: 1,
  },
  color6: {
    backgroundColor: "#faff78",
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
    borderWidth: 1,
  },
});
