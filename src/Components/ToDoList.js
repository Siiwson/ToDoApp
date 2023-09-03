import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React from "react";

export default function ToDoList({ GlobalState, navigation }) {
  const { toDoList, setToDoList, setChosenTask } = GlobalState;

  const handleChooseTask = (item) => {
    setChosenTask(item);
    navigation.navigate("ChosenTask");
  };

  const deleteItemById = (id) => {
    const filteredData = toDoList.filter((item) => item.id !== id);
    setToDoList(filteredData);
  };

  return (
    <FlatList
      data={toDoList}
      renderItem={({ item }) => (
        <View style={styles.task}>
          <Pressable
            onPress={() => handleChooseTask(item)}
            style={{ width: "90%" }}
          >
            <Text>
              {item.task.length < 85
                ? item.task
                : item.task.slice(0, 85) + "..."}
            </Text>
          </Pressable>
          <Pressable onPress={() => deleteItemById(item.id)}>
            <FontAwesome name='trash' size={34} color='#ff2424' />
          </Pressable>
        </View>
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
});
