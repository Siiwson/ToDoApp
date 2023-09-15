import {
  StyleSheet,
  Text,
  View,
  Pressable,
  useColorScheme,
  Alert,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { doc, deleteDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../Firebase";
import { COLORS } from "../../Colors";

import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function ChosenTask({ navigation, GlobalState }) {
  //Color theme
  const colorScheme = useColorScheme();
  const themeTextStyle =
    colorScheme === "light" ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;
  const themeInputStyle =
    colorScheme === "light" ? styles.lightInput : styles.darkInput;
  const themeBody =
    colorScheme === "light" ? styles.lightBody : styles.darkBody;
  const themTime = colorScheme === "light" ? styles.lightTime : styles.darkTime;

  //Global State
  const { chosenTask, uid, chosenTodos } = GlobalState;

  //Delete task and back to main page
  const deleteItemAndReturn = (id) => {
    Alert.alert("Delete task", "Are you sure you want to delete this task?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () =>
          deleteDoc(
            doc(
              FIREBASE_DB,
              "users/",
              uid,
              "/listOfTodos/",
              chosenTodos.id,
              "/todos",
              id
            )
          ),
      },
    ]);
    navigation.navigate("Home");
  };

  return (
    <View style={[styles.container, themeContainerStyle]}>
      <Header />
      <View style={[styles.body, themeBody]}>
        <View style={styles.timeContainer}>
          <Text style={[styles.timeText, themTime]}>
            {chosenTask.item.timestamp
              ? chosenTask.item.timestamp.toDate().toDateString() +
                " at " +
                chosenTask.item.timestamp.toDate().toLocaleTimeString()
              : null}
          </Text>
        </View>
        <Text style={chosenTask.item.isDone ? styles.doneTask : themeTextStyle}>
          {chosenTask.item.task}
        </Text>
      </View>
      <Pressable
        onPress={() => deleteItemAndReturn(chosenTask.id)}
        style={[styles.deleteItem, themeInputStyle]}
      >
        <FontAwesome
          name='trash'
          size={50}
          color={colorScheme === "light" ? COLORS.lightTrash : COLORS.darkTrash}
        />
      </Pressable>
      <Footer navigation={navigation} />
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
    flex: 8,
    width: "100%",
    paddingBottom: 40,
    paddingTop: 15,
    paddingHorizontal: 24,
  },
  deleteItem: {
    zIndex: 1,
    position: "absolute",
    bottom: 45,
    right: 20,
    width: 75,
    height: 75,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6.27,
    elevation: 3,
  },
  doneTask: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    color: COLORS.lightButton,
    fontSize: 24,
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
    fontSize: 24,
    color: COLORS.LightText,
  },
  darkThemeText: {
    fontSize: 24,
    color: COLORS.DarkText,
  },
  lightContainer: {
    backgroundColor: COLORS.LightBackground,
  },
  darkContainer: {
    backgroundColor: COLORS.DarkBackground,
  },
  lightBody: {
    backgroundColor: COLORS.LightBackground5percent,
  },
  darkBody: {
    backgroundColor: COLORS.DarkBackground5percent,
  },
  timeText: {
    fontSize: 12,
  },
  lightTime: {
    color: COLORS.LightText,
  },
  darkTime: {
    color: COLORS.timeText,
  },
  timeContainer: {
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
