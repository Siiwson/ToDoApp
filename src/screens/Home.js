import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
//For generating unique task id
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import AntDesign from "react-native-vector-icons/AntDesign";
import Constants from "expo-constants";

import Header from "../Components/Header";
import ToDoList from "../Components/ToDoList";
import { FIREBASE_AUTH } from "../../Firebase";

export default function Home({ navigation, GlobalState }) {
  const { setToDoList, task, setTask } = GlobalState;

  const handleSaveTask = () => {
    const index = uuidv4();
    setToDoList((prevState) => [
      ...prevState,
      { id: index, task: task, isDone: false },
    ]);
    setTask("");
  };

  return (
    <View style={styles.container}>
      <Header />
      <Pressable onPress={() => FIREBASE_AUTH.signOut()} style={styles.signout}>
        <AntDesign name='close' size={40} color='black' />
      </Pressable>
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ededed",
  },
  body: {
    flex: 9,
    width: "100%",
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
  },
  signout: {
    position: "absolute",
    top: 10,
    right: 10,
    paddingTop: Constants.statusBarHeight,
  },
});
