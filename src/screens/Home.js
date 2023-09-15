import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  useColorScheme,
} from "react-native";
import { useEffect } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import Constants from "expo-constants";
import { Keyboard } from "react-native";
import { COLORS } from "@/Colors";
import { FIREBASE_AUTH, FIREBASE_DB } from "@/Firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

import Header from "@/Components/Header";
import ToDoList from "@/Components/ToDoList";

export default function Home({ navigation, GlobalState }) {
  //Color theme
  const colorScheme = useColorScheme();
  const themeTextStyle =
    colorScheme === "light" ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;
  const themeInputStyle =
    colorScheme === "light" ? styles.lightInput : styles.darkInput;
  const themeButtonStyle =
    colorScheme === "light" ? styles.lightButton : styles.darkButton;

  //Global State
  const { task, setTask, uid, setToDoList, loading, chosenTodos } = GlobalState;

  //Save task to firebase, and close keyboard
  const handleSaveTask = (e) => {
    e.preventDefault();
    addDoc(
      collection(
        FIREBASE_DB,
        "users/",
        uid,
        "/listOfTodos/",
        chosenTodos.id,
        "/todos"
      ),
      {
        task: task,
        isDone: false,
        timestamp: serverTimestamp(),
      }
    );
    setTask("");
    Keyboard.dismiss();
  };

  const q = query(
    collection(
      FIREBASE_DB,
      "users/" + uid + "/listOfTodos/" + chosenTodos.id + "/todos"
    ),
    orderBy("timestamp", "asc")
  );

  //Read task from firebase
  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      setToDoList(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          item: doc.data(),
        }))
      );
    });
    console.log(uid); //display actual user id
  }, [task, loading, uid]);

  const placeholderInput = "Add task to " + chosenTodos.item.name + " list!";

  return (
    <View style={[styles.container, themeContainerStyle]}>
      <Header />
      <Pressable onPress={() => FIREBASE_AUTH.signOut()} style={styles.signout}>
        <AntDesign
          name='close'
          size={40}
          color={colorScheme === "light" ? COLORS.LightText : COLORS.DarkText}
        />
      </Pressable>
      <View style={styles.body}>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, themeInputStyle]}
            onChangeText={setTask}
            value={task}
            placeholder={placeholderInput}
          />
          <Pressable
            style={[styles.button, themeButtonStyle]}
            onPress={handleSaveTask}
          >
            <Text style={[{ fontWeight: 600, fontSize: 20 }, themeTextStyle]}>
              Save task
            </Text>
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
  },
  body: {
    flex: 9,
    width: "100%",
  },
  input: {
    padding: 15,
    marginTop: 15,
    borderRadius: 10,
    width: "90%",
    borderWidth: 1,
    fontSize: 18,
  },
  button: {
    padding: 12,
    margin: 15,
    borderRadius: 10,
    alignItems: "center",
    width: 120,
    borderWidth: 1,
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
  lightInput: {
    backgroundColor: COLORS.white,
    color: COLORS.black,
    borderColor: COLORS.LightText,
  },
  darkInput: {
    backgroundColor: COLORS.LightText,
    color: COLORS.white,
    borderColor: COLORS.DarkText,
  },
  lightThemeText: {
    color: COLORS.LightText,
  },
  darkThemeText: {
    color: COLORS.DarkText,
  },
  lightButton: {
    backgroundColor: COLORS.lightButton,
    borderColor: COLORS.LightText,
  },
  darkButton: {
    backgroundColor: COLORS.darkButton,
    borderColor: COLORS.DarkText,
  },
  lightContainer: {
    backgroundColor: COLORS.LightBackground,
  },
  darkContainer: {
    backgroundColor: COLORS.DarkBackground,
  },
});
