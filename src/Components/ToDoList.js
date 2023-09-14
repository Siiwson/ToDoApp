import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../Firebase";

export default function ToDoList({ GlobalState, navigation }) {
  const { toDoList, setChosenTask, uid } = GlobalState;

  const handleChooseTask = (item) => {
    setChosenTask(item);
    navigation.navigate("ChosenTask");
  };

  const handleMarkAsDone = (item) => {
    updateDoc(doc(FIREBASE_DB, "users/", uid, "/todos", item.id), {
      isDone: !item.item.isDone,
    });
  };

  const handleDelete = (item) => {
    deleteDoc(doc(FIREBASE_DB, "users/", uid, "/todos", item.id));
  };

  return (
    <FlatList
      data={toDoList}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => handleChooseTask(item)}
          onLongPress={() => handleMarkAsDone(item)}
        >
          <View style={item.item.isDone ? styles.taskDone : styles.task}>
            <Text style={item.item.isDone ? styles.done : styles.notDone}>
              {item.item.task.length < 85
                ? item.item.task
                : item.item.task.slice(0, 85) + "..."}
            </Text>
            <Pressable onPress={() => handleDelete(item)}>
              <FontAwesome name='trash' size={34} color='#ff2424' />
            </Pressable>
          </View>
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  task: {
    backgroundColor: "white",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6.27,
    elevation: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskDone: {
    backgroundColor: "#c3e0fa",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6.27,
    elevation: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  done: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    color: "#4f87e8",
  },
});
