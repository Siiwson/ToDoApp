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
  //Color theme
  const colorScheme = useColorScheme();
  const themeTextStyle =
    colorScheme === "light" ? styles.lightThemeText : styles.darkThemeText;
  const themeInputStyle =
    colorScheme === "light" ? styles.lightInput : styles.darkInput;
  const themeDoneInputStyle =
    colorScheme === "light" ? styles.lightDoneInput : styles.darkDoneInput;

  //Global State
  const { toDoList, setChosenTask, uid } = GlobalState;

  //Chose task to read all note
  const handleChooseTask = (item) => {
    setChosenTask(item);
    navigation.navigate("ChosenTask");
  };

  //Mark task as done
  const handleMarkAsDone = (item) => {
    updateDoc(doc(FIREBASE_DB, "users/", uid, "/todos", item.id), {
      isDone: !item.item.isDone,
    });
  };

  //Delete task
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
            <View>
              <Text style={item.item.isDone ? styles.done : themeTextStyle}>
                {item.item.task.length < 35
                  ? item.item.task
                  : item.item.task.slice(0, 35) + "..."}
              </Text>
              <Text style={styles.timeText}>
                {item.item.timestamp
                  ? item.item.timestamp.toDate().toDateString()
                  : null}
              </Text>
            </View>
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
  lightDoneInput: {
    backgroundColor: COLORS.taskDoneLight,
  },
  darkDoneInput: {
    backgroundColor: COLORS.taskDoneDark,
  },
  timeText: {
    fontSize: 12,
    color: COLORS.timeText,
  },
});
