import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Constants from "expo-constants";
import { Keyboard } from "react-native";
import { COLORS } from "../../Colors";

import Header from "../Components/Header";
import ToDoList from "../Components/ToDoList";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../Firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function Home({ navigation, GlobalState }) {
  const { task, setTask, uid } = GlobalState;

  const handleSaveTask = (e) => {
    e.preventDefault();
    addDoc(collection(FIREBASE_DB, "users/", uid, "/todos"), {
      task: task,
      isDone: false,
      timestamp: serverTimestamp(),
    });
    setTask("");
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <Header />
      <Pressable onPress={() => FIREBASE_AUTH.signOut()} style={styles.signout}>
        <AntDesign name='close' size={40} color={COLORS.black} />
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
    backgroundColor: COLORS.background,
  },
  body: {
    flex: 9,
    width: "100%",
  },
  input: {
    backgroundColor: COLORS.white,
    padding: 15,
    marginTop: 15,
    borderRadius: 10,
    shadowColor: COLORS.black,
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
    backgroundColor: COLORS.button,
    color: "white",
    padding: 12,
    margin: 15,
    borderRadius: 10,
    shadowColor: COLORS.black,
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
