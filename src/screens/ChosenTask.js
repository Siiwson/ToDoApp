import { StyleSheet, Text, View, Pressable } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function ChosenTask({ navigation, GlobalState }) {
  const { toDoList, setToDoList, chosenTask } = GlobalState;

  const deleteItemAndReturn = (id) => {
    const filteredData = toDoList.filter((item) => item.id !== id);
    setToDoList(filteredData);
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.body}>
        <Text style={styles.taskText}>{chosenTask.task}</Text>
      </View>
      <Pressable
        onPress={() => deleteItemAndReturn(chosenTask.id)}
        style={styles.deleteItem}
      >
        <FontAwesome name='trash' size={60} color='#ff2424' />
      </Pressable>
      <Footer navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ededed",
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flex: 8,
    width: "100%",
    alignItems: "flex-start",
    backgroundColor: "#14141410",
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  taskText: {
    fontSize: 24,
    color: "#000000",
  },
  deleteItem: {
    position: "absolute",
    bottom: 100,
    right: 20,
    backgroundColor: "#ededed",
    width: 75,
    height: 75,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6.27,
    elevation: 10,
  },
});
