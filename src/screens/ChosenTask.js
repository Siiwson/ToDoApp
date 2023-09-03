import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";

import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function ChosenTask({ navigation, GlobalState }) {
  const { chosenTask } = GlobalState;

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.body}>
        <Text style={styles.taskText}>{chosenTask.task}</Text>
      </View>
      <Footer navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffff0",
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flex: 8,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#14141410",
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  taskText: {
    fontSize: 24,
    color: "#000000",
    fontWeight: "bold",
  },
});