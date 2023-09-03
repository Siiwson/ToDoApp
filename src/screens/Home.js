import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
//For generating unique task id
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import Header from "../Components/Header";
import ToDoList from "../Components/ToDoList";

export default function Home({ navigation, GlobalState }) {
  const { setToDoList, task, setTask } = GlobalState;

  const handleSaveTask = () => {
    const index = uuidv4();
    setToDoList((prevState) => [...prevState, { id: index, task: task }]);
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
            <Text style={{ fontWeight: 600, fontSize: 20 }}>Save task</Text>
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
    flex: 9,
    width: "100%",
    backgroundColor: "#14141415",
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    marginTop: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    width: "90%",
  },
  button: {
    backgroundColor: "#4f87e8",
    color: "white",
    padding: 12,
    margin: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    alignItems: "center",
    width: 120,
  },
  inputContainer: {
    alignItems: "center",
    backgroundColor: "#ededed",
  },
});
