import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";

import Header from "../Components/Header";
import ToDoList from "../Components/ToDoList";

export default function Home({ navigation, GlobalState }) {
  const { toDoList, setToDoList, task, setTask } = GlobalState;

  const handleSaveTask = () => {
    const index = toDoList.length + 1;
    setToDoList((prevState) => [
      ...prevState,
      { id: index, task: task, isSelected: false },
    ]);
    setTask("");
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.body}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setTask}
            value={task}
            placeholder='Add task!'
          />
          <Pressable style={styles.button} onPress={handleSaveTask}>
            <Text>Save task</Text>
          </Pressable>
        </View>

        <ToDoList GlobalState={GlobalState} navigation={navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "##fffff0",
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flex: 8,
    width: "100%",
    backgroundColor: "#14141410",
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    marginTop: 15,
    marginBottom: 15,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    width: "100%",
  },
  button: {
    backgroundColor: "#14141450",
    color: "white",
    padding: 15,
    marginTop: 15,
    marginBottom: 15,
    marginRight: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
