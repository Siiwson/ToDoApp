import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  useColorScheme,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Constants from "expo-constants";
import { Keyboard } from "react-native";
import { COLORS } from "../../Colors";

import Header from "../Components/Header";
import ToDoList from "../Components/ToDoList";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../Firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

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
  const { task, setTask, uid } = GlobalState;

  //Save task to firebase, and close keyboard
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
            placeholder='Add task!'
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
  lightInput: {
    backgroundColor: COLORS.white,
    color: COLORS.black,
  },
  darkInput: {
    backgroundColor: COLORS.LightText,
    color: COLORS.white,
  },
  lightThemeText: {
    color: COLORS.LightText,
  },
  darkThemeText: {
    color: COLORS.DarkText,
  },
  lightButton: {
    backgroundColor: COLORS.lightButton,
  },
  darkButton: {
    backgroundColor: COLORS.darkButton,
  },
  lightContainer: {
    backgroundColor: COLORS.LightBackground,
  },
  darkContainer: {
    backgroundColor: COLORS.DarkBackground,
  },
});
