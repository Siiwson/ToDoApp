import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  useColorScheme,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../Firebase";
import { COLORS } from "../../Colors";

export default function ToDoList({ GlobalState, navigation }) {
  const colorScheme = useColorScheme();
  const themeTextStyle =
    colorScheme === "light" ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;
  const themeInputStyle =
    colorScheme === "light" ? styles.lightInput : styles.darkInput;
  const themeDoneInputStyle =
    colorScheme === "light" ? styles.lightDoneInput : styles.darkDoneInput;
  const themeButtonStyle =
    colorScheme === "light" ? styles.lightButton : styles.darkButton;

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
          <View
            style={[
              styles.task,
              item.item.isDone ? themeDoneInputStyle : themeInputStyle,
            ]}
          >
            <Text style={item.item.isDone ? styles.done : themeTextStyle}>
              {item.item.task.length < 45
                ? item.item.task
                : item.item.task.slice(0, 45) + "..."}
            </Text>
            <Pressable onPress={() => handleDelete(item)}>
              <FontAwesome
                name='trash'
                size={34}
                color={
                  colorScheme === "light" ? COLORS.lightTrash : COLORS.darkTrash
                }
              />
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
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: COLORS.black,
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
    color: COLORS.listColor,
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
  lightDoneInput: {
    backgroundColor: COLORS.taskDoneLight,
  },
  darkDoneInput: {
    backgroundColor: COLORS.taskDoneDark,
  },
});
